import type { UserRepository, LoginUserDTO, RegisterUserDTO } from "../../domain/user.repository.js";
import type { UserEntity } from "../../domain/user.entity.js";
import type { User,PrismaClient } from "../../../../../prisma/generated/client.js";

import { UserValue } from "../../domain/user.value.js";

export class PrismaUserRepository implements UserRepository {

  constructor(private readonly prisma: PrismaClient) {}

  // Registrar un usuario
  async registerUser(data: RegisterUserDTO): Promise<UserEntity | null> {
    // Verificar si el email ya existe
    const exists = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (exists) return null;

    const userDb = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });

    // Mapeo a UserEntity
    return new UserValue(userDb.id, userDb.name, userDb.email, userDb.password);
  }

  // Buscar usuario por email para login
  async findUser(data: LoginUserDTO): Promise<UserEntity | null> {
    const userDb = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!userDb) return null;

    return new UserValue(userDb.id, userDb.name, userDb.email, userDb.password);
  }


}
