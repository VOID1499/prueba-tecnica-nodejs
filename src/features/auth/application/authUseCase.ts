import type { UserRepository } from "../domain/user.repository.js";
import type { LoginUserDTO, RegisterUserDTO } from "../domain/user.repository.js";
import { encrypt ,compare } from "../../../shared/utils/handlePassword.js";
import { signToken } from "../../../shared/utils/handleJwt.js";

export class AuthUseCase {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async login(data: LoginUserDTO) {

    const user = await this.userRepository.findUser(data);
    if (!user) throw new Error("Credenciales invalidas");
    
    const matchPassword = await compare(data.password,user.password);
    if(!matchPassword) throw Error("Credenciales invalidas")

    const token = signToken({ id: user.id, email: user.email, name: user.name });
    return token;
  }

  async register(data: RegisterUserDTO) {

    const passwordHash = await encrypt(data.password);
    const user = await this.userRepository.registerUser({...data,password:passwordHash});

    if (!user) {
      throw new Error("No se pudo registrar el usuario");
    }

    return user;
  }
}
