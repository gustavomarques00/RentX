import { AppError } from "@shared/errors/AppError"
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository"
import {NextFunction, Request,Response} from "express"
import { verify } from "jsonwebtoken"

interface Ipayload {
    sub: string
}

export async function ensureAuthenticated(request:Request,response: Response, next:NextFunction) {
    const authHeader = request.headers.authorization

    if(!authHeader){
        throw new AppError("Token Missing", 401)
    }

    const [, token] = authHeader.split(" ")

    try{
        const {sub: user_id} = verify(token, "216c494e7f780dff0b50f8b48107c872") as Ipayload

        const usersRepository = new UsersRepository()

        const user = await usersRepository.findById(user_id)

        if(!user){
            throw new AppError("User does not exists!", 401)
        }

        request.user = {
            id: user_id
        }

        next()
    }catch{
        throw new AppError ("Invalid token!", 401)
    }
}