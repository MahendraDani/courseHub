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
exports.signupUser = void 0;
const users_1 = require("../../../models/users");
const date_1 = require("../../../utils/date");
const time_1 = require("../../../utils/time");
const statusMessages_1 = require("../../../utils/statusMessages");
const statusCodes_1 = require("../../../utils/statusCodes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const zod_1 = require("zod");
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const signupSchema = zod_1.z.object({
            name: zod_1.z.string(),
            email: zod_1.z.string().email().min(6),
            password: zod_1.z.string().min(6),
        });
        const parsedInput = signupSchema.safeParse(req.body);
        if (!parsedInput.success) {
            return res.status(statusCodes_1.STATUSCODES.BAD_REQUEST).json({ parsedInput });
        }
        const name = parsedInput.data.name;
        const email = parsedInput.data.email;
        const password = parsedInput.data.password;
        if (!email || !password) {
            return res
                .status(statusCodes_1.STATUSCODES.UNAUTHORIZED)
                .json({ message: statusMessages_1.STATUSMESSAGES.INVALID_CREDENTIALS });
        }
        const isExistingUser = yield users_1.User.findOne({ email });
        if (isExistingUser) {
            return res
                .status(statusCodes_1.STATUSCODES.FORBIDDEN)
                .json({ message: statusMessages_1.STATUSMESSAGES.USER_ALREADY_EXISTS });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const payload = {
            name,
            email,
            password: hashedPassword,
            createdOn: (0, date_1.getDate)(),
            createdAt: (0, time_1.getTime)(),
            role: "user",
        };
        const newUser = new users_1.User(payload);
        yield newUser.save();
        //@ts-ignore
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });
        res.status(statusCodes_1.STATUSCODES.CREATED).json({
            message: statusMessages_1.STATUSMESSAGES.SIGNUP_SUCCESS,
            userId: newUser._id,
            token: token,
        });
    }
    catch (error) {
        return res
            .status(statusCodes_1.STATUSCODES.INTERNAL_SERVER_ERROR)
            .json({ message: statusMessages_1.STATUSMESSAGES.INTERNAL_SERVER_ERROR, error: error });
    }
});
exports.signupUser = signupUser;
