import { Router } from "express";
import { MockRepository } from "./repository/mock.repository.js";
import { AuthUseCase } from "../application/authUseCase.js";
import { AuthController } from "./auth.controller.js";
import { validateSchema } from "../../../shared/middlewares/validateSchema.js";
import { userLoginSchema, userRegisterSchema } from "./user.schema.js";
import { PrismaUserRepository } from "./repository/prismaRepository.js";
import PrismaClient from "../../../db/prismaClient.js"


export const router = Router();

const prismaRepository = new PrismaUserRepository(PrismaClient);
const authUseCase = new AuthUseCase(prismaRepository);

const userController = new AuthController(authUseCase);

router.post("/register", validateSchema(userRegisterSchema), userController.register)
router.post("/login", validateSchema(userLoginSchema), userController.login)


