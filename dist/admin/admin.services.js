"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
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
exports.AdminService = {
    createAdmin,
    getAdmin,
    readAdmin,
};
