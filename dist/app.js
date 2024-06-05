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
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("./errors/apiError"));
const routes_1 = __importDefault(require("./app/routes"));
const generative_ai_1 = require("@google/generative-ai");
const genAI = new generative_ai_1.GoogleGenerativeAI("AIzaSyCUGnlIXYN1Ui-kZzXPS7S3ti4XKg7pJ_s");
const app = (0, express_1.default)();
app.post('api/v1/ask', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { inputText } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = yield model.generateContent(inputText);
        const response = yield result.response;
        const text = response.text();
        res.json({ responseText: text });
    }
    catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ error: "An error occurred while generating content" });
    }
}));
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
app.use('/api/v1', routes_1.default);
app.use((err, req, res, next) => {
    if (err instanceof apiError_1.default) {
        res.status(err.statusCode).json({ sucess: false, message: err.message });
    }
    else {
        res.status(http_status_1.default.NOT_FOUND).json({
            success: false,
            message: 'Something Went Wrong' + err,
        });
    }
    next();
});
exports.default = app;
