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
        synchronize: true,
        entities: ['dist/**/*.entity.{js,ts}'],
        migrations: ['dist/src/db/migrations/*.{js,ts}'],
      }),

      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
