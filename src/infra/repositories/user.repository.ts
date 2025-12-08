import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/infra/entities/user.entity';
import type { TCreateUserDTO, TUserResponseDTO } from 'src/infra/dtos/user.dto';
import type { TUserRepository } from 'src/domain/repositories/iuser.repository';

function normalizeAddress(raw: any) {
  if (raw == null) return undefined;
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw);
    } catch {
      return undefined;
    }
  }
  return raw;
}

@Injectable()
export class UserRepository implements TUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async createUser(createUserData: TCreateUserDTO): Promise<TUserResponseDTO> {
    const entity = this.repo.create(createUserData as any);
    const saved = await this.repo.save(entity);
    const savedEntity: User = Array.isArray(saved) ? saved[0] : (saved as User);

    return {
      id: savedEntity.id as unknown as string,
      fullname: savedEntity.fullname,
      profileImage: (savedEntity as any).profileImage,
      cpf: (savedEntity as any).cpf,
      birthDate: savedEntity.birthDate as unknown as string | Date,
      gender: (savedEntity as any).gender,
      phoneNumber: savedEntity.phoneNumber,
      email: savedEntity.email,
      enrollmentNumber: (savedEntity as any).enrollmentNumber,
      post: (savedEntity as any).post,
      unity: (savedEntity as any).unity,
      specialization: (savedEntity as any).specialization,
      address: normalizeAddress((savedEntity as any).address),
      // isActive removed from response
    };
  }

  async findAll(): Promise<TUserResponseDTO[]> {
    const rows = await this.repo.find();
    return rows.map((r) => ({
      id: r.id as unknown as string,
      fullname: r.fullname,
      profileImage: (r as any).profileImage,
      cpf: (r as any).cpf,
      birthDate: r.birthDate as unknown as string | Date,
      gender: (r as any).gender,
      phoneNumber: r.phoneNumber,
      email: r.email,
      enrollmentNumber: (r as any).enrollmentNumber,
      post: (r as any).post,
      unity: (r as any).unity,
      specialization: (r as any).specialization,
      address: normalizeAddress((r as any).address),
      // isActive removed from response
    }));
  }

  async findOne(idOrEmail: string): Promise<TUserResponseDTO | null> {
    const r = await this.repo.findOne({
      where: [{ id: idOrEmail } as any, { email: idOrEmail } as any],
    });
    if (!r) return null;
    return {
      id: r.id as unknown as string,
      fullname: r.fullname,
      profileImage: (r as any).profileImage,
      cpf: (r as any).cpf,
      birthDate: r.birthDate as unknown as string | Date,
      gender: (r as any).gender,
      phoneNumber: r.phoneNumber,
      email: r.email,
      enrollmentNumber: (r as any).enrollmentNumber,
      post: (r as any).post,
      unity: (r as any).unity,
      specialization: (r as any).specialization,
      address: normalizeAddress((r as any).address),
      // isActive removed from response
    };
  }

  async findEntityByEmail(email: string): Promise<User | null> {
    const r = await this.repo.findOne({ where: { email } });
    return r ?? null;
  }

  async update(
    id: string,
    updateData: Partial<TCreateUserDTO>,
  ): Promise<TUserResponseDTO> {
    await this.repo.update(id as any, updateData as any);
    const updated = await this.repo.findOne({
      where: { id: id } as any,
    });
    return {
      id: updated?.id as unknown as string,
      fullname: updated!.fullname,
      profileImage: (updated as any).profileImage,
      cpf: (updated as any).cpf,
      birthDate: updated!.birthDate as unknown as string | Date,
      gender: (updated as any).gender,
      phoneNumber: updated!.phoneNumber,
      email: updated!.email,
      enrollmentNumber: (updated as any).enrollmentNumber,
      post: (updated as any).post,
      unity: (updated as any).unity,
      specialization: (updated as any).specialization,
      address: normalizeAddress((updated as any).address),
      // isActive removed from response
    };
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id as any);
  }
}
