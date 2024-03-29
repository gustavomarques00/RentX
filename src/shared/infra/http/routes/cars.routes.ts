import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload"
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensuredAuthenticated";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImageController = new UploadCarImagesController()

const upload = multer(uploadConfig.upload("./tmp/cars"))

carsRoutes.post("/",ensureAuthenticated, ensureAdmin,createCarController.handle)

carsRoutes.get("/available", listAvailableCarsController.handle)

carsRoutes.post("/specifications/:id",ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle)

carsRoutes.post("/images/:id",ensureAuthenticated, ensureAdmin, upload.array("images") ,uploadCarImageController.handle)

export {carsRoutes}