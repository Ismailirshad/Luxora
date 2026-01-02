import Redis from "ioredis"

export const client = new Redis(process.env.UPSTASH_REDIS_URL);
