"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.Transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: "subairasam8733260@gmail.com",
        pass: "nasazuigpioownuc"
    }
});
