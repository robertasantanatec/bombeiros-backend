import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Incident } from 'src/infra/entities/incident.entity';
import type {
  TCreateIncidentDTO,
  TIncidentResponseDTO,
} from 'src/infra/dtos/incident.dto';
import type { TIncidentRepository } from 'src/domain/repositories/iincident.repository';

@Injectable()
export class IncidentRepository implements TIncidentRepository {
  constructor(
    @InjectRepository(Incident)
    private readonly repo: Repository<Incident>,
  ) {}

  async createIncident(
    createIncidentData: TCreateIncidentDTO,
  ): Promise<TIncidentResponseDTO> {
    const entity = this.repo.create(createIncidentData as any);
    const saved = await this.repo.save(entity);
    const savedEntity: Incident = Array.isArray(saved)
      ? saved[0]
      : (saved as Incident);
    return {
      id: savedEntity.id as unknown as string,
      fullname: savedEntity.fullname,
      firstPhoneNumber: savedEntity.firstPhoneNumber,
      secondPhoneNumber: savedEntity.secondPhoneNumber,
      observations: savedEntity.observations,
      incidentType: savedEntity.incidentType,
      associatedTeam: savedEntity.associatedTeam,
      status: savedEntity.status,
      dateTime: savedEntity.dateTime,
    };
  }

  async findAll(): Promise<TIncidentResponseDTO[]> {
    const rows = await this.repo.find(); // removed relations
    return rows.map((r) => ({
      id: r.id as unknown as string,
      fullname: r.fullname,
      firstPhoneNumber: r.firstPhoneNumber,
      secondPhoneNumber: r.secondPhoneNumber,
      observations: r.observations,
      incidentType: r.incidentType,
      associatedTeam: r.associatedTeam,
      status: r.status,
      dateTime: r.dateTime,
      // removed userId
    }));
  }

  async findOne(id: string): Promise<TIncidentResponseDTO | null> {
    const r = await this.repo.findOne({ where: { id: id } as any }); // removed relations
    if (!r) return null;
    return {
      id: r.id as unknown as string,
      fullname: r.fullname,
      firstPhoneNumber: r.firstPhoneNumber,
      secondPhoneNumber: r.secondPhoneNumber,
      observations: r.observations,
      incidentType: r.incidentType,
      associatedTeam: r.associatedTeam,
      status: r.status,
      dateTime: r.dateTime,
      // removed userId
    };
  }

  async update(
    id: string,
    updateData: Partial<TCreateIncidentDTO>,
  ): Promise<TIncidentResponseDTO> {
    await this.repo.update(id as any, updateData as any);
    const updated = await this.repo.findOne({ where: { id: id } as any }); // removed relations
    return {
      id: updated?.id as unknown as string,
      fullname: updated!.fullname,
      firstPhoneNumber: updated!.firstPhoneNumber,
      secondPhoneNumber: updated!.secondPhoneNumber,
      observations: updated!.observations,
      incidentType: updated!.incidentType,
      associatedTeam: updated!.associatedTeam,
      status: updated!.status,
      dateTime: updated!.dateTime,
      // removed userId
    };
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id as any);
  }
}
