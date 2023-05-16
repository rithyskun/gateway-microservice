import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('POSTGRES_URI'),
        autoLoadEntities: true,
        // entities: ['dist/**/*.entity.{js,ts}'],
        // migrations: ['dist/src/db/migration/*.{js,ts}'],
        synchronize: true, // shouldn't be used in production - may lose data
      }),

      inject: [ConfigService],
    }),
  ],
})
export class PostgresDBModule {}
