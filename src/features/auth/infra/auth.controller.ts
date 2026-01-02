import { encrypt } from "../../../shared/utils/handlePassword.js";
import type { AuthUseCase } from "../application/authUseCase.js";
import type { Request ,Response } from "express";

export class AuthController {

    constructor(
        private readonly authUseCase:AuthUseCase){
    }

    public register = async (req: Request, res: Response) => {

        try {
            const { name, email, password } = req.body;
            
            const result = await this.authUseCase.register({
                name,
                email,
                password,
            });

            
            res.status(201).json(result);
            
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    };


    public login = async (req:Request,res:Response)=>{
        try {
            const { email, password } = req.body;
            const result = await this.authUseCase.login({email,password})
            res.json({token:result});
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }

}