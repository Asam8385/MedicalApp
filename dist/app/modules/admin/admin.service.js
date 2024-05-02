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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const emailTransporter_1 = require("../../../helpers/emailTransporter");
const moment_1 = __importDefault(require("moment"));
const { v4: uuidv4 } = require('uuid');
const sendVerificationEmail = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUrl = "http://localhost:6003/api/v1/auth/";
    const uniqueString = uuidv4() + data.id;
    const uniqueStringHashed = yield bcrypt_1.default.hashSync(uniqueString, 12);
    const url = currentUrl + 'user/verify/' + data.id + '/' + uniqueString;
    // const currentTime = moment();
    const expiresDate = (0, moment_1.default)().add(6, 'hours');
    const verficationData = yield prisma_1.default.userVerfication.create({
        data: {
            userId: data.id,
            expiresAt: expiresDate.toDate(),
            uniqueString: uniqueStringHashed
        }
    });
    if (verficationData) {
        const pathName = "../../../template/verify.html";
        const obj = {
            link: url
        };
        const replacementObj = obj;
        const subject = "Email Verification";
        const fromMail = "subairasam8733260@gmail.com";
        const toMail = "asam.ugeng8385@gmail.com";
        (0, emailTransporter_1.EmailtTransporter)({ pathName, replacementObj, fromMail, toMail, subject });
    }
});
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const { password } = payload, othersData = __rest(payload, ["password"]);
        const existEmail = yield tx.auth.findUnique({ where: { email: othersData.email } });
        if (existEmail) {
            throw new Error("Email Already Exist !!");
        }
        const admin = yield tx.admin.create({ data: othersData });
        yield tx.auth.create({
            data: {
                email: admin.email,
                password: password && (yield bcrypt_1.default.hashSync(password, 12)),
                role: client_1.UserRole.admin,
                userId: admin.id
            },
        });
        return admin;
    }));
    if (data.id) {
        sendVerificationEmail(data);
    }
    return data;
});
const getAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.admin.findUnique({
        where: {
            id: id
        }
    });
    return result;
});
// const getSingleAdmin = async (payload: string): Promise<IAdmin | null> => {
//     const result = await AdminModel.findOne({_id: payload});
//     return result;
// }
// const deleteAdmin = async (payload: string): Promise<void> => {
//     await AdminModel.findOneAndDelete({_id: payload});
// }
// const updateAdmin = async (adminId: string, payload: IAdmin): Promise<IAdmin | null> => {
//     const result = await AdminModel.findOneAndUpdate({_id: adminId}, {payload});
//     return result;
// }
exports.AdminService = {
    create,
    getAdmin
};
