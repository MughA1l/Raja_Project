// queues/imageQueue.js
import { Queue } from 'bullmq';

export const imageQueue = new Queue('image-processing', {
  connection: { host: '127.0.0.1', port: 6379 },
});

// Called inside createChapter or addImages service
export async function queueImageProcessing({ imageId, localPath }) {
  await imageQueue.add('process-image', { imageId, localPath });
}
