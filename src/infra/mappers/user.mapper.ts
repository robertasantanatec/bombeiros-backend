import { Injectable } from '@nestjs/common';
import type { TMapper } from 'src/domain/mappers/ientity.mapper';
import { User } from '../entities/user.entity';
import type { TCreateUserDTO, TUserResponseDTO } from '../dtos/user.dto';

@Injectable()
export class UserMapper implements TMapper<User, TUserResponseDTO> {
  entityToDto(entity: User): TUserResponseDTO {
    return {
      id: entity.id as unknown as string,
      fullname: entity.fullname,
      email: entity.email,
      phoneNumber: entity.phoneNumber,
      isActive: entity.isActive,
    };
  }

  dtoToEntity(dto: TCreateUserDTO): User {
    const user = new User();
    user.fullname = dto.fullname;
    user.profileImage = (dto as any).profileImage ?? '';
    user.cpf = (dto as any).cpf ?? '';
    user.birthDate = dto.birthDate ? new Date(dto.birthDate) : new Date();
    user.gender = (dto.gender as 'M' | 'F') ?? 'M';
    user.phoneNumber = (dto as any).phoneNumber ?? '';
    user.email = dto.email;
    user.enrollmentNumber = (dto as any).enrollmentNumber ?? '';
    user.post = (dto as any).post ?? '';
    user.unity = (dto as any).unity ?? '';
    user.specialization = (dto as any).specialization ?? '';
    user.address = (dto as any).address ?? {};
    user.passwordHash = (dto as any).passwordHash ?? '';
    user.isActive = dto.isActive ?? true;
    return user;
  }
}
