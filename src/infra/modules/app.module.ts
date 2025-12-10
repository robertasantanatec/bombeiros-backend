import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { User } from 'src/infra/entities/user.entity';
import { Incident } from 'src/infra/entities/incident.entity';
import { DatabaseModule } from './database.module';
import { UserModule } from './user.module';
import { IncidentModule } from './incident.module';
import { TokenModule } from './token.module';
import { ConfigModule } from '@nestjs/config';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    UserModule,
    IncidentModule,
    TokenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
