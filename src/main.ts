import express from "express";
import "dotenv/config";

import { env } from "./config/env.js";
import { router as userRouter } from "./features/auth/infra/auth.router.js";
import { router as noteRouter} from "./features/notes/infra/note.router.js";


const app = express();


app.use(express.json())


app.use("/auth",userRouter);
app.use("/notes",noteRouter);



const server = app.listen(env.PORT,()=>{
    console.log(`Server on port ${env.PORT}`)
})