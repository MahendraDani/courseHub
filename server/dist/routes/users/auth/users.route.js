"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const users_controller_1 = require("../../controllers/auth/users.controller");
router.post("/signup", users_controller_1.userSignupHandler);
router.post("/login", users_controller_1.usersLoginHandler);
exports.default = router;
