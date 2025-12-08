import type { TCreateUserDTO, TUserResponseDTO } from '../../infra/dtos/user.dto';

export type TUserRepository = {
  createUser: (createUserData: TCreateUserDTO) => Promise<TUserResponseDTO>;
  findAll: () => Promise<TUserResponseDTO[]>;
  findOne: (id: string) => Promise<TUserResponseDTO | null>;
  update: (id: string, updateData: Partial<TCreateUserDTO>) => Promise<TUserResponseDTO>;
  remove: (id: string) => Promise<void>;
};