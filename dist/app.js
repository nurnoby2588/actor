"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./middleware/globalErrorHandler"));
const actor_router_1 = __importDefault(require("./actor/actor.router"));
const admin_router_1 = __importDefault(require("./admin/admin.router"));
const notification_router_1 = __importDefault(require("./notification/notification.router"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1/actors', actor_router_1.default);
app.use('/api/v1/admin', admin_router_1.default);
app.use('/api/v1/notification', notification_router_1.default);
app.use(globalErrorHandler_1.default);
// Test route
app.get("/", (req, res) => {
    res.send("Server is running with TypeScript!");
});
exports.default = app;
