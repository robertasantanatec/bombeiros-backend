import { Injectable } from '@nestjs/common';
import type { TIncidentService } from 'src/domain/services/iincident.service';
import { IncidentRepository } from 'src/infra/repositories/incident.repository';
import type {
  TCreateIncidentDTO,
  TIncidentResponseDTO,
} from 'src/infra/dtos/incident.dto';

@Injectable()
export class IncidentService implements TIncidentService {
  constructor(
    private readonly incidentRepository: IncidentRepository,
  ) {}

  async createIncident(
    createIncidentData: TCreateIncidentDTO,
  ): Promise<TIncidentResponseDTO> {
    return await this.incidentRepository.createIncident(createIncidentData);
  }

  async findAll(): Promise<TIncidentResponseDTO[]> {
    return await this.incidentRepository.findAll();
  }

  async findOne(id: string): Promise<TIncidentResponseDTO | null> {
    return await this.incidentRepository.findOne(id);
  }

  async update(
    id: string,
    updateData: Partial<TCreateIncidentDTO>,
  ): Promise<TIncidentResponseDTO> {
    return await this.incidentRepository.update(id, updateData);
  }

  async remove(id: string): Promise<void> {
    return await this.incidentRepository.remove(id);
  }
}
