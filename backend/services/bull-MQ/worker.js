// services/bull-MQ/worker.js
import mongoose from "mongoose";
import { Worker } from "bullmq";
import Image from "../../models/Image.model.js";
import extractTextFromCloudinaryUrl from "../image-processing/aws.js";
import useGemini from "../image-processing/gemini-processing.js";
import searchYouTubeVideos from "../image-processing/youtube-data-api.js";
import { emitNotification } from "../../config (db connect)/socket.io.js";


export const startWorker = () => {
  const worker = new Worker(
    "image-processing",
    async (job) => {
      try {
        const { imageId, localPath } = job.data;
        console.log(` Starting job for image: ${localPath}`);

        // Extract text
        await job.updateProgress(10);
        console.log(`[10%] Extracting text from image...`);
        const extractedText = await extractTextFromCloudinaryUrl(localPath);

        // Gemini processing
        await job.updateProgress(40);
        console.log(`[40%] Sending text to Gemini...`);
        let geminiResult = await useGemini(extractedText);

        if (typeof geminiResult === "string") {
          try {
            geminiResult = JSON.parse(geminiResult);
          } catch (err) {
            console.error(" Failed to parse Gemini result:", geminiResult);
            throw err;
          }
        }

        console.log(geminiResult);

        // Extract structured data
        await job.updateProgress(60);
        console.log(`[60%] Processing Gemini response...`);
        const ocr = geminiResult[0].ocr;
        const enhancedText = geminiResult[1].enhancedAIExplanation;
        const keywords = geminiResult[2].ytKeywords.join(" ");

        // Search YouTube
        await job.updateProgress(80);
        console.log(`[80%] Fetching YouTube videos...`);
        const videos = await searchYouTubeVideos(keywords);

        // Save to DB
        await job.updateProgress(95);
        console.log(`[95%] Saving results to database...`);
        await Image.findByIdAndUpdate(imageId, { ocr, enhancedText, videos });


        await job.updateProgress(100);
        console.log(` [100%] Completed job for image: ${imageId}`);
        return { imageId };
      } catch (err) {
        console.error(` Failed to process image ${job.data.imageId}:`, err);
        throw err;
      }
    },
    {
      connection: { host: "127.0.0.1", port: 6379 },
      settings: {
        backoffStrategies: {
          customBackoff: () => 10000,
        },
      },
    }
  );

  // Job events
  worker.on("progress", (job, progress) => {
    emitNotification(`Job ${job.id} is ${progress}% done`);
    console.log(`Job ${job.id} progress: ${progress}%`);
  });

  worker.on("completed", (job) => {
    console.log(`Job completed: ${job.id}`);
    emitNotification(`Job ${job.id} completed successfully!`);
  });

  worker.on("failed", (job, err) => {
    console.error(`Job failed: ${job?.id}`, err);
    emitNotification(`Job ${job?.id} failed!`);
  });
};
