"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const actor_schema_1 = __importDefault(require("../actor/actor.schema"));
const error_1 = require("../middleware/error");
const admin_schema_1 = require("./admin.schema");
const createAdmin = async (payload) => {
    if (!payload) {
        throw new error_1.AppError(400, "No data provided");
    }
    const newAdmin = await admin_schema_1.Admin.create(payload);
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
const addActor = async (actorData) => {
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
    const result = await actor_schema_1.default.create(actorProfile);
    console.log(result);
    if (!result) {
        throw new Error("Failed to fill up actor profile");
    }
    return result;
};
const updateActor = async (actorData, id) => {
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
    const result = await actor_schema_1.default.findByIdAndUpdate(id, actorProfile);
    console.log(result);
    if (!result) {
        throw new Error("Failed to fill up actor profile");
    }
    return result;
};
exports.AdminService = {
    createAdmin,
    getAdmin,
    readAdmin,
    addActor,
    updateActor
};
