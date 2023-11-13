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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const statusMessages_1 = require("../../../utils/statusMessages");
const statusCodes_1 = require("../../../utils/statusCodes");
const users_1 = require("../../../models/users");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(statusCodes_1.STATUSCODES.UNAUTHORIZED)
            .json({ message: statusMessages_1.STATUSMESSAGES.INVALID_CREDENTIALS });
    }
    const isUser = yield users_1.User.findOne({ email });
    if (!isUser) {
        return res
            .status(statusCodes_1.STATUSCODES.UNAUTHORIZED)
            .json({ message: statusMessages_1.STATUSMESSAGES.INVALID_CREDENTIALS });
    }
});
exports.loginUser = loginUser;
