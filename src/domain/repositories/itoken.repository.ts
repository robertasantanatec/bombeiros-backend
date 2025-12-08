import { Token } from 'src/infra/entities/token.entity';
import { User } from 'src/infra/entities/user.entity';

export type TTokenRepository = {
  update(id: string, hash: string): Promise<void>;
  findOneByHash(hash: string): Promise<Token | null>;
  findOneByUsername(username: string): Promise<Token | null>;
  getUserByToken(token: string): Promise<User | null>;
};
