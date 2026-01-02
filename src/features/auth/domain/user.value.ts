import type { UserEntity } from "./user.entity.js";
import { randomUUID } from "node:crypto";

export class UserValue implements UserEntity {

  // Objeto en memoria con los valores
  constructor(
    public id: string = randomUUID(),
    public name: string,
    public email: string,
    public password: string
  ) {}
  
}