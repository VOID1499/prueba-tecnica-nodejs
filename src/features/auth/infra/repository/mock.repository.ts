import type { UserEntity } from "../../domain/user.entity.js";

import type {
  LoginUserDTO,
  RegisterUserDTO,
  UserRepository
} from "../../domain/user.repository.js";

export class MockRepository implements UserRepository {
  private users: UserEntity[] = [];

  async registerUser(data: RegisterUserDTO): Promise<UserEntity | null> {
    const exists = this.users.find(u => u.email === data.email);
    if (exists) return null;

    const user: UserEntity = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      password:data.password
    };

    this.users.push(user);
    return user;
  }

  async findUser(data: LoginUserDTO): Promise<UserEntity | null> {
    const user = this.users.find(u => u.email === data.email);
    if (!user) return null;

    // En un mock no validamos hash real
    // asumimos password correcto
    return user;
  }
}
