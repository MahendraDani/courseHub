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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = require("./config/database");
const signup_route_1 = __importDefault(require("./routes/users/auth/signup.route"));
const login_route_1 = __importDefault(require("./routes/users/auth/login.route"));
const zod_1 = require("zod");
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.connectDB)();
        app.listen(port, () => {
            console.log(`Server running at port: ${port}`);
        });
    }
    catch (error) {
        console.log("Error starting the server : ");
        console.log(error);
    }
});
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// connectDB();
app.use("/users", signup_route_1.default);
app.use("/users", login_route_1.default);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const nameSchema = zod_1.z.string();
        const parsedOutput = nameSchema.safeParse(name);
        return res.json(parsedOutput);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.send("THis is zod error");
        }
    }
}));
startServer();
