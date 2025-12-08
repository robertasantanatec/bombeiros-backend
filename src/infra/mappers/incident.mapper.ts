import { Injectable } from '@nestjs/common';
import type { TMapper } from 'src/domain/mappers/ientity.mapper';
import { Incident } from '../entities/incident.entity';
import type {
  TCreateIncidentDTO,
  TIncidentResponseDTO,
} from '../dtos/incident.dto';

@Injectable()
export class IncidentMapper implements TMapper<Incident, TIncidentResponseDTO> {
  entityToDto(entity: Incident): TIncidentResponseDTO {
    return {
      id: entity.id as unknown as string,
      fullname: entity.fullname,
      firstPhoneNumber: entity.firstPhoneNumber,
      secondPhoneNumber: entity.secondPhoneNumber,
      observations: entity.observations,
      incidentType: entity.incidentType,
      associatedTeam: entity.associatedTeam,
      status: entity.status,
      dateTime: entity.dateTime,
    };
  }

  dtoToEntity(dto: TCreateIncidentDTO): Incident {
    const incident = new Incident();
    incident.fullname = dto.fullname;
    incident.firstPhoneNumber = dto.firstPhoneNumber;
    incident.secondPhoneNumber = (dto as any).secondPhoneNumber ?? '';
    incident.observations = (dto as any).observations ?? '';
    incident.incidentType = dto.incidentType;
    incident.associatedTeam = (dto as any).associatedTeam ?? '';
    incident.status = (dto as any).status ?? 'open';
    incident.dateTime = dto.dateTime ? new Date(dto.dateTime) : new Date();
    return incident;
  }
}
