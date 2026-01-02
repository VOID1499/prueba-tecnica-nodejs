import type { UserEntity } from "./user.entity.js";

// DTOs de entrada
export interface RegisterUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserDTO {
  email: string;
  password: string;
}

export interface UserRepository {
  registerUser(data: RegisterUserDTO): Promise<UserEntity | null>;
  findUser(data: LoginUserDTO): Promise<UserEntity | null>;
}
