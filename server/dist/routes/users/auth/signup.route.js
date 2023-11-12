"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const signup_controller_1 = require("../../../controllers/users/auth/signup.controller");
router.post("/signup", signup_controller_1.signupUser);
exports.default = router;
