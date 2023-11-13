"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const statusMessages_1 = require("../../../utils/statusMessages");
const statusCodes_1 = require("../../../utils/statusCodes");
const users_1 = require("../../../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const zod_1 = require("zod");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginSchema = zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(6),
    });
    const parsedInput = loginSchema.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(statusCodes_1.STATUSCODES.BAD_REQUEST).json(parsedInput);
    }
    const email = parsedInput.data.email;
    const password = parsedInput.data.password;
    if (!email || !password) {
        return res
            .status(statusCodes_1.STATUSCODES.UNAUTHORIZED)
            .json({ message: statusMessages_1.STATUSMESSAGES.INVALID_CREDENTIALS });
    }
    const user = yield users_1.User.findOne({ email });
    if (!user) {
        return res
            .status(statusCodes_1.STATUSCODES.UNAUTHORIZED)
            .json({ message: statusMessages_1.STATUSMESSAGES.INVALID_CREDENTIALS });
    }
    //@ts-ignore
    const isPasswordMatch = bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordMatch) {
        return res
            .status(statusCodes_1.STATUSCODES.UNAUTHORIZED)
            .json({ message: statusMessages_1.STATUSMESSAGES.INVALID_CREDENTIALS });
    }
    const payload = {
        name: user.name,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        createdOn: user.createdOn,
        role: user.role,
    };
    //@ts-ignore
    const accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    return res.status(statusCodes_1.STATUSCODES.OK).json({
        message: statusMessages_1.STATUSMESSAGES.LOGIN_SUCCESS,
        userId: user._id,
        token: accessToken,
    });
});
exports.loginUser = loginUser;
