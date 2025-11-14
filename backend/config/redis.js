import Redis from "ioredis"

export const client = new Redis(process.env.UPSTASH_REDIS_URL);
// await client.set('foo', 'bar');