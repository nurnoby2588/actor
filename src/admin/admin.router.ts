import express from "express";
import { AdminController} from "./admin.controller";
import { fileUploader } from "../helper/fileUpload";
const adminRouter = express.Router();
adminRouter.post( "/",AdminController.createAdmin);
adminRouter.post( "/add-actor",AdminController.addActor);
adminRouter.put( "/update-actor/:id",AdminController.updateActor);
adminRouter.get('/',AdminController.getAdmin);
adminRouter.put('/:id',AdminController.readNotificaton)
export default adminRouter;
