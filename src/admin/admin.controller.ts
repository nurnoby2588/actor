import { NextFunction, Request, Response } from "express";
import sendResponse from "../shared/sendResponse";
import catchAsync from "../shared/catchAsync";
import { AdminService } from "./admin.services";

const createAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    console.log(data)
    const result = await AdminService.createAdmin(data);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Admin created successfully",
      data: result,
    });
  }
);

const getAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AdminService.getAdmin();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin fetched successfully",
      data: result,
    });
  }
);
const readNotificaton = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AdminService.readAdmin();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Not successfully",
      data: result,
    });
  }
);
const addActor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("object")
    const data = req.body;
    const result = await AdminService.addActor(data);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Actor profile filled up successfully",
      data: result,
    });
  }
);
const updateActor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("object")
    const data = req.body;
    const id = req.params.id;
    const result = await AdminService.updateActor(data,id);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Actor profile filled up successfully",
      data: result,
    });
  }
);

export const AdminController = {
  createAdmin,
  getAdmin,
  readNotificaton,
  addActor,
  updateActor
};
