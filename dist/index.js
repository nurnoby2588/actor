"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const startServer = async () => {
    try {
        app_1.default.listen(config_1.default.port, () => {
            console.log(`Server running on port ${config_1.default.port}`);
        });
        await mongoose_1.default.connect(config_1.default.database_url);
        console.log("MongoDB connected");
    }
    catch (error) {
        console.error("Database connection failed:", error);
    }
};
startServer();
