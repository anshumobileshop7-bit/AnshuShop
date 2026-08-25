import mongoose from 'express';
import mongooseDriver from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryServer = null;

export const connectDB = async () => {
  const primaryUri = process.env.MONGO_URI || 'mongodb://localhost:27017/anshu_mobile';

  try {
    // Attempt standard connection with 3-second timeout
    await mongooseDriver.connect(primaryUri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`✅ MongoDB Connected successfully: ${mongooseDriver.connection.host}`);
  } catch (err) {
    console.warn(`⚠️ Standard MongoDB connection failed (${err.message}). Starting In-Memory MongoDB for local seamless experience...`);
    try {
      mongoMemoryServer = await MongoMemoryServer.create();
      const inMemoryUri = mongoMemoryServer.getUri();
      await mongooseDriver.connect(inMemoryUri);
      console.log(`✅ MongoDB In-Memory Server Connected: ${inMemoryUri}`);
    } catch (memErr) {
      console.error(`❌ In-memory MongoDB failed: ${memErr.message}`);
      process.exit(1);
    }
  }
};
