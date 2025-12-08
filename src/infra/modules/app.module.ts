import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { User } from 'src/infra/entities/user.entity';
import { Incident } from 'src/infra/entities/incident.entity';
import { DatabaseModule } from './database.module';
import { UserModule } from './user.module';
import { IncidentModule } from './incident.module';
import { TokenModule } from './token.module';
dotenv.config();

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    IncidentModule,
    TokenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
