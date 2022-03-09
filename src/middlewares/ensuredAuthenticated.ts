import {NextFunction, Request,Response} from "express"
import { verify } from "jsonwebtoken"
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository"

interface Ipayload {
    sub: string
}

export async function ensureAuthenticated(request:Request,response: Response, next:NextFunction) {
    const authHeader = request.headers.authorization

    if(authHeader){
        throw new Error("Token Missing")
    }

    const [, token] = authHeader.split(" ")

    try{
        const {sub: user_id} = verify(token, "216c494e7f780dff0b50f8b48107c872") as Ipayload

        const usersRepository = new UsersRepository()

        const user = await usersRepository.findById(user_id)

        if(!user){
            throw new Error("user does not exists!")
        }

        next()
    }catch{
        throw new Error ("Invalid token!")
    }
}