import { CacheModule } from "@nestjs/cache-manager";
import { Global, Module } from "@nestjs/common";
import { redisStore, RedisCache } from "cache-manager-redis-yet";
import { RedisService } from "./redis.service";
import { createClient } from 'redis';
@Global()
@Module({
    providers: [
        {
            provide: 'REDIS_CLIENT',
            useFactory: async () => {
                const client = createClient({
                    socket: {
                        host: process.env.REDIS_HOST || 'localhost',
                        port: Number(process.env.REDIS_PORT) || 6379,
                    },
                    database: 2,
                });
                await client.connect();
                return client;
            },

        },
        RedisService],
    exports: ['REDIS_CLIENT', RedisService],
})
export class RedisModule { }