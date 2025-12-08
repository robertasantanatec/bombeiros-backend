import type { TCreateIncidentDTO, TIncidentResponseDTO } from '../../infra/dtos/incident.dto';

export type TIncidentRepository = {
  createIncident: (
    createIncidentData: TCreateIncidentDTO,
  ) => Promise<TIncidentResponseDTO>;
  findAll: () => Promise<TIncidentResponseDTO[]>;
  findOne: (id: string) => Promise<TIncidentResponseDTO | null>;
  update: (id: string, updateData: Partial<TCreateIncidentDTO>) => Promise<TIncidentResponseDTO>;
  remove: (id: string) => Promise<void>;
};
