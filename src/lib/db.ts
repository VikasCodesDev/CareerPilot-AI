import dns from "dns";
import mongoose from "mongoose";
import { env } from "@/config/env";

const MONGODB_URI = env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

async function ensureMongoDnsResolution(uri: string): Promise<void> {
  if (!uri.startsWith("mongodb+srv://")) {
    return;
  }

  let host = "";
  try {
    const url = new URL(uri);
    host = url.host;
  } catch {
    const match = uri.match(/^mongodb\+srv:\/\/(?:[^@]+@)?([^/?]+)(?:\/?|$)/);
    if (match) {
      host = match[1];
    }
  }

  if (!host) {
    return;
  }

  try {
    await dns.promises.resolveSrv(`_mongodb._tcp.${host}`);
  } catch (error: unknown) {
    const err = error as NodeJS.ErrnoException;
    if (err?.code === "ECONNREFUSED" || err?.code === "ETIMEOUT") {
      dns.setServers(["8.8.8.8", "1.1.1.1"]);
      console.info(
        "MongoDB SRV DNS query failed against the default resolver; retrying with public DNS servers.",
      );
      await dns.promises.resolveSrv(`_mongodb._tcp.${host}`);
    } else {
      throw error;
    }
  }
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

    cached.promise = ensureMongoDnsResolution(MONGODB_URI)
      .then(() => mongoose.connect(MONGODB_URI, opts))
      .then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
