import mongoose from 'mongoose';
import { Worker } from 'bullmq';
import Image from '../../models/Image.model.js';
import extractTextFromCloudinaryUrl from '../image-processing/aws.js';
import useGemini from '../image-processing/gemini-processing.js';
import searchYouTubeVideos from '../image-processing/youtube-data-api.js';
import dotenv from 'dotenv';
dotenv.config();
import { emitNotification } from '../../config (db connect)/socket.io.js';

// MongoDB connection for worker
(async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || 'mongodb+srv://hassan:4eN6OfqAqRuUeqDZ@cluster0.pvhhoib.mongodb.net/db?retryWrites=true&w=majority&appName=Cluster0',
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log(" Worker connected to MongoDB");
  } catch (err) {
    console.error(" MongoDB connection error in worker:", err);
    process.exit(1);
  }
})();

// Worker
export const worker = new Worker(
  'image-processing',
  async (job) => {
    try {
      const { imageId, localPath } = job.data;
      console.log(` Starting job for image: ${localPath}`);

      // STEP 1: Extract text
      await job.updateProgress(10);
      console.log(`[10%] Extracting text from image...`);

      const extractedText = await extractTextFromCloudinaryUrl(localPath);

      // STEP 2: Gemini processing
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

      // STEP 3: Extract structured data
      await job.updateProgress(60);
      console.log(`[60%] Processing Gemini response...`);
      const ocr = geminiResult[0].ocr;
      const enhancedText = geminiResult[1].enhancedAIExplanation;
      const keywords = geminiResult[2].ytKeywords.join(' ');

      // STEP 4: Search YouTube
      await job.updateProgress(80);
      console.log(`[80%] Fetching YouTube videos...`);
      const videos = await searchYouTubeVideos(keywords);

      // STEP 5: Save to DB
      await job.updateProgress(95);
      console.log(`[95%] Saving results to database...`);
      await Image.findByIdAndUpdate(imageId, { ocr, enhancedText, videos });

      // Final step
      await job.updateProgress(100);
      console.log(` [100%] Completed job for image: ${imageId}`);
      emitNotification(`Image 100% ${imageId} processed successfully!`);

      return { imageId };
    } catch (err) {
      console.error(` Failed to process image ${job.data.imageId}:`, err);
      throw err;
    }
  },
  {
    connection: { host: '127.0.0.1', port: 6379 },
    // Retry logic
    settings: {
      backoffStrategies: {
        customBackoff: () => 10000 // // wait 3s before retry
      }
    }
  }
);

// Job events
worker.on('progress', (job, progress) => {
  console.log(`📊 Job ${job.id} progress: ${progress}%`);
});

worker.on('completed', (job) => {
  console.log(`🎉 Job completed: ${job.id}`);
});

worker.on('failed', (job, err) => {
  console.error(`🔥 Job failed: ${job?.id}`, err);
});
