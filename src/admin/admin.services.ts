import Actor from "../actor/actor.schema";
import { AppError } from "../middleware/error";
import sendResponse from "../shared/sendResponse";
import { Admin } from "./admin.schema";

const createAdmin = async (payload: any) => {
  if (!payload) {
    throw new AppError(400, "No data provided");
  }
  const newAdmin = await Admin.create(payload);
  if (!newAdmin) {
    throw new Error("Failed to create admin");
  }
  return {
    adminInfo: newAdmin,
  };
};
const getAdmin = async () => {
  return {
    msg: "Admin fetched",
  };
};
const readAdmin = async () => {
  return {
    msg: "Admin read",
  };
};
const addActor = async (actorData: any) => {
  const actorProfile = {
    phoneNumber: actorData.phoneNumber,
    presentAddress: actorData.presentAddress,
    dob: actorData.dob,
    bloodGroup: actorData.bloodGroup,
    idNo: actorData.idNo,
    fullName: actorData.fullName,
    category: actorData.category,
  };
  console.log(actorData);
  const result = await Actor.create(actorProfile);
  console.log(result)
  if (!result) {
    throw new Error("Failed to fill up actor profile");
  }
  return result;
};

export const AdminService = {
  createAdmin,
  getAdmin,
  readAdmin,
  addActor,
};
