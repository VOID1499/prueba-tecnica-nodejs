import bcrypt from "bcryptjs";


export const encrypt = async  (flatPassword:string)=>{
    try {
        const passwordHash = await bcrypt.hash(flatPassword,10);
        return passwordHash;        
    } catch (error) {
        throw error;
    }
}

export const compare = async (flatPassword:string,passwordHash:string)=>{
   return await bcrypt.compare(flatPassword,passwordHash)
}