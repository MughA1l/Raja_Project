// services/bull-MQ/worker.js
import mongoose from "mongoose";
import { Worker } from "bullmq";
import Image from "../../models/Image.model.js";
import extractTextFromCloudinaryUrl from "../image-processing/aws.js";
import useGemini from "../image-processing/gemini-processing.js";
import searchYouTubeVideos from "../image-processing/youtube-data-api.js";
import { emitNotification } from "../../config (db connect)/socket.io.js";
import path from "path";

// helper to extract clean filename after the first "-"
const extractFileName = (localPath) => {
  if (!localPath) return "Unknown file";
  const base = path.basename(localPath); // e.g. 172399320-image-1.jpg
  const parts = base.split("-");
  return parts.length > 1 ? parts.slice(1).join("-") : base; // "image-1.jpg"
};

export const startWorker = () => {
  const worker = new Worker(
    "image-processing",
    async (job) => {
      try {
        const { imageId, localPath } = job.data;
        const fileName = extractFileName(localPath);

        console.log(` Starting job for image: ${fileName}`);
        emitNotification(`Processing ${fileName} started`);

        // Extract text
        await job.updateProgress(10);
        console.log(
          `[10%] Extracting text from ${fileName}...`
        );
        emitNotification(
          `Processing ${fileName}: 10% done`
        );
        const extractedText =
          await extractTextFromCloudinaryUrl(localPath);

        // Gemini processing
        await job.updateProgress(40);
        console.log(
          `[40%] Sending ${fileName} text to Gemini...`
        );
        emitNotification(
          `Processing ${fileName}: 40% done`
        );
        let geminiResult = await useGemini(extractedText);

        if (typeof geminiResult === "string") {
          try {
            geminiResult = JSON.parse(geminiResult);
          } catch (err) {
            console.error(
              " Failed to parse Gemini result:",
              geminiResult
            );
            throw err;
          }
        }

        console.log(geminiResult);

        // Extract structured data
        await job.updateProgress(60);
        console.log(
          `[60%] Processing Gemini response for ${fileName}...`
        );
        emitNotification(
          `Processing ${fileName}: 60% done`
        );
        const ocr = geminiResult[0].ocr;
        const enhancedText =
          geminiResult[1].enhancedAIExplanation;
        const keywords =
          geminiResult[2].ytKeywords.join(" ");

        // Search YouTube
        await job.updateProgress(80);
        console.log(
          `[80%] Fetching YouTube videos for ${fileName}...`
        );
        emitNotification(
          `Processing ${fileName}: 80% done`
        );
        const videos = await searchYouTubeVideos(keywords);

        // Save to DB
        await job.updateProgress(95);
        console.log(
          `[95%] Saving ${fileName} results to database...`
        );
        emitNotification(
          `Processing ${fileName}: 95% done`
        );
        await Image.findByIdAndUpdate(imageId, {
          ocr,
          enhancedText,
          videos,
        });

        await job.updateProgress(100);
        console.log(
          ` [100%] Completed job for image: ${fileName}`
        );
        emitNotification(
          `Processing ${fileName} completed successfully!`
        );
        return {
          imageId,
        };
      } catch (err) {
        console.error(
          ` Failed to process image ${job.data.imageId}:`,
          err
        );
        throw err;
      }
    },
    {
      connection: {
        host: "127.0.0.1",
        port: 6379,
      },
      settings: {
        backoffStrategies: {
          customBackoff: () => 10000,
        },
      },
    }
  );

  // Job events
  worker.on("progress", (job, progress) => {
    const fileName = extractFileName(job.data.localPath);
    console.log(
      `Job ${job.id} (${fileName}) progress: ${progress}%`
    );
  });

  worker.on("completed", (job) => {
    const fileName = extractFileName(job.data.localPath);
    console.log(`Job completed: ${job.id} (${fileName})`);
    emitNotification(
      `Processing ${fileName} completed successfully!`
    );
  });

  worker.on("failed", (job, err) => {
    const fileName = extractFileName(job?.data?.localPath);
    console.error(
      `Job failed: ${job?.id} (${fileName})`,
      err
    );
    emitNotification(`Processing ${fileName} failed!`);
  });
};
