import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Token } from 'src/infra/entities/token.entity';
import { User } from 'src/infra/entities/user.entity';
import { Incident } from 'src/infra/entities/incident.entity';

dotenv.config();


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        entities: [Token, User, Incident],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
