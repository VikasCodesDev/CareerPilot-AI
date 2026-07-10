import mongoose from "mongoose";
import { env } from "@/config/env";

const MONGODB_URI = env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Prevent TS errors on global object usage
declare global {
  var mongoose: MongooseCache | undefined;
}

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

const cached: MongooseCache = global.mongoose;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
