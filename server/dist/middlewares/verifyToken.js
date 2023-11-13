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
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const statusCodes_1 = require("../utils/statusCodes");
const statusMessages_1 = require("../utils/statusMessages");
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res
                .status(statusCodes_1.STATUSCODES.NOT_FOUND)
                .json({ message: statusMessages_1.STATUSMESSAGES.ACCEES_TOKEN_NOT_FOUND });
        }
        //@ts-ignore
        const isMatch = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!isMatch) {
            return res
                .status(statusCodes_1.STATUSCODES.FORBIDDEN)
                .json({ message: statusMessages_1.STATUSMESSAGES.ACCESS_TOKEN_INVALID });
        }
        next();
    }
    catch (error) {
        return res
            .status(statusCodes_1.STATUSCODES.BAD_REQUEST)
            .json({ message: statusMessages_1.STATUSMESSAGES.ACCESS_TOKEN_INVALID });
    }
});
exports.verifyToken = verifyToken;
