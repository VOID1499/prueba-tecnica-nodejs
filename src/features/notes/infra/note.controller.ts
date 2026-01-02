import type { NoteUseCase } from "../application/noteUseCase.js";
import type { Request ,Response } from "express";

export class NoteController {


    constructor(
        private readonly noteUseCase:NoteUseCase){
    }

    public createNote = async (req: any, res: Response) => {
        const userId = req.user.id; 
        const { titulo, contenido, colaboradores } = req.body;

        const note = await this.noteUseCase.createNote({
            titulo,
            contenido,
            propietario: userId,
            colaboradores,
        });

        res.status(201).json(note);
    };



    public  findNote = async (req: any, res: Response) => {

        try {
            const userId = req.user.id;           
            const { id: noteId } = req.params;    
           
            const note = await this.noteUseCase.getNote(noteId, userId);
            if(!note) res.sendStatus(404) //responder solo estado
            res.json(note);
            
        } catch (error) {
            console.log(error)
            res.sendStatus(500)
        }
    }

    public listNotes = async (req:any,res:Response)=>{
        try {
            const userId = req.user.id;           
            const result = await this.noteUseCase.listUserNotes(userId) 
            res.json({notas:result})
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }


    public deleteNote = async (req:any,res:Response)=>{
        try {
            const userId = req.user.id;           
            const { id: noteId } = req.params; 
            console.log(userId)   
            const result:boolean | null = await this.noteUseCase.deleteNote(noteId,userId) 
            if(result) res.sendStatus(200);
            if(!result) res.sendStatus(404);

        } catch (error) {
            res.sendStatus(500);
            console.log(error)
        }
    }

    public updateNote = async (req:any,res:Response)=>{
        try {
            const { titulo, contenido, colaboradores } = req.body
            const userId = req.user.id;
            const { id: noteId } = req.params; 
            const result = await this.noteUseCase.updateNote(noteId,userId,{titulo,contenido,colaboradores});
            return res.sendStatus(200);       
        } catch (error) {
            console.log(error)
            res.sendStatus(500);
        }
    }


    public sharedNote = async(req:any,res:Response) =>{
        
        try {
            const { id: noteId } = req.params;
            const ownerId = req.user.id;
            const { user_id } = req.body;
            console.log(noteId,ownerId,user_id)
            await this.noteUseCase.shareNote(noteId, ownerId, user_id);
            res.sendStatus(200);

       } catch (error) {
            res.sendStatus(500);
            console.log(error)
       }
    }

}