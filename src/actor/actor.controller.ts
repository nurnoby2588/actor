import { NextFunction, Request, Response } from "express";
import sendResponse from "../shared/sendResponse";
import { ActorService } from "./actor.services";
import catchAsync from "../shared/catchAsync";
import { AppError } from "../middleware/error";
import { skip } from "node:test";

const createActor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    const data = req.body;
    // console.log("Body =>", req.body);
    // console.log("Files =>", files);

    const result = await ActorService.createActor(files, data);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Actors retrieved successfully",
      data: result,
    });
  }
);

const getSingleActor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const actorId = req.params.id;
    const result = await ActorService.getSingleActor(actorId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Single actor fetch successfully",
      data: result,
    });
  }
);
const getAllActor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const search = req.query?.search as string;
    const category = req.query?.category as string;
    const limit = parseInt(req.query?.limit as string) || 10;
    const page = parseInt(req.query?.page as string) || 1;
    console.log(" page", page)
    const skip = ((page - 1) * limit)
    console.log("category", category)
    const result = await ActorService.getAllActor(search, category, limit, skip);
    console.log(result)
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All actor fetch successfully",
      data: result,
    });
  }
);
const updateActor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const search = req.query?.search as string;
    const category = req.query?.category as string;
    const limit = parseInt(req.query?.limit as string) || 10;
    const page = parseInt(req.query?.page as string) || 1;
    console.log(" page", page)
    const skip = ((page - 1) * limit)
    console.log("category", category)
    const result = await ActorService.getAllActor(search, category, limit, skip);
    console.log(result)
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All actor fetch successfully",
      data: result,
    });
  }
);
const filterByRank = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const rank = req.params.rank;
    console.log("rank", rank)
    const result = await ActorService.filterByRank(rank);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Get data by rank successfully",
      data: result,
    });
  }
);

const adminFillUpActorProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const result = await ActorService.adminFillUpActorProfile(data);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Actor profile filled up successfully",
      data: result,
    });
  }
);

export const ActorController = {
  createActor,
  getSingleActor,
  getAllActor,
  filterByRank,
  adminFillUpActorProfile,
  updateActor
};
