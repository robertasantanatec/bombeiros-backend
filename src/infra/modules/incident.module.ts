import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incident } from 'src/infra/entities/incident.entity';
import { IncidentRepository } from 'src/infra/repositories/incident.repository';
import { IncidentService } from 'src/infra/services/incident.service';
import { IncidentMapper } from 'src/infra/mappers/incident.mapper';
import { IncidentController } from 'src/interface/controllers/incident.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Incident])],
  controllers: [IncidentController],
  providers: [IncidentRepository, IncidentMapper, IncidentService],
  exports: [IncidentService],
})
export class IncidentModule {}
