import { Injectable } from '@nestjs/common';
import type { TUserService } from 'src/domain/services/iuser.service';
import { UserRepository } from 'src/infra/repositories/user.repository';
import { UserMapper } from 'src/infra/mappers/user.mapper';
import type { TCreateUserDTO, TUserResponseDTO } from 'src/infra/dtos/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService implements TUserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async createUser(createUserData: TCreateUserDTO): Promise<TUserResponseDTO> {
    // se o front enviar 'password' (ou enviar 'passwordHash' com senha plain),
    // gera o hash e salva em passwordHash antes de persistir.
    const payload: any = createUserData as any;
    const plain = payload.password ?? payload.passwordHash;
    if (plain) {
      const saltRounds = 10;
      const hashed = await bcrypt.hash(String(plain), saltRounds);
      payload.passwordHash = hashed;
      // remover campo plain para evitar salvar texto cru caso exista
      if (payload.password) delete payload.password;
    }
    return await this.userRepository.createUser(payload);
  }

  async findAll(): Promise<TUserResponseDTO[]> {
    return await this.userRepository.findAll();
  }

  async findOne(idOrEmail: string): Promise<TUserResponseDTO | null> {
    return await this.userRepository.findOne(idOrEmail);
  }

  async update(id: string, updateData: Partial<TCreateUserDTO>): Promise<TUserResponseDTO> {
    return await this.userRepository.update(id, updateData);
  }

  async remove(id: string): Promise<void> {
    return await this.userRepository.remove(id);
  }
}
