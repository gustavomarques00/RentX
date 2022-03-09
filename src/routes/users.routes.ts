import { Router } from "express";
import multer from "multer";
import { ensureAuthenticated } from "../middlewares/ensuredAuthenticated";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { CreateUserController } from "../modules/accounts/useCases/CreateUser/CreateUserController";
import uploadConfig from "../config/upload"

const usersRoutes = Router()

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"))

const createUserController = new CreateUserController()
const updateUserAvatarController = new UpdateUserAvatarController()

usersRoutes.post("/", createUserController.handle)

usersRoutes.patch("/avatar",ensureAuthenticated,uploadAvatar.single("avatar"),updateUserAvatarController.handle)

export {usersRoutes}