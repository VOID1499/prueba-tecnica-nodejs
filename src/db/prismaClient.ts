import { Prisma, PrismaClient } from "../../prisma/generated/client.js";
import { PrismaPg } from '@prisma/adapter-pg'
import { env } from '../config/env.js';

const pool = new PrismaPg({ connectionString: env.DATABASE_URL })
const prisma = new PrismaClient({ adapter: pool })

export default prisma;