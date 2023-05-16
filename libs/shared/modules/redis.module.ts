import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';

import { RedisCacheService } from '../services/radis-cache.service';

@Module({
  imports: [
    CacheModule.register({
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_URI'),
        port: configService.get('REDIS_PORT'),
      }),
      isGlobal: true,
      inject: [ConfigService],
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisModule {}
