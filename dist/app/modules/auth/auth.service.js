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
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const jwtHelper_1 = require("../../../helpers/jwtHelper");
const config_1 = __importDefault(require("../../../config"));
const { v4: uuidv4 } = require('uuid');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const loginUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { email: IEmail, password } = user;
    const isUserExist = yield prisma_1.default.auth.findUnique({
        where: { email: IEmail }
    });
    if (!isUserExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "User is not Exist !");
    }
    // check Verified doctor or not
    if (isUserExist.role === 'admin') {
        const getAdminInfo = yield prisma_1.default.admin.findUnique({
            where: {
                email: isUserExist.email
            }
        });
        if (getAdminInfo && (getAdminInfo === null || getAdminInfo === void 0 ? void 0 : getAdminInfo.verified) === false) {
            throw new apiError_1.default(http_status_1.default.NOT_FOUND, "Please Verify Your Email First !");
        }
    }
    if (isUserExist.role === 'doctor') {
        const getdoctorInfo = yield prisma_1.default.doctor.findUnique({
            where: {
                email: isUserExist.email
            }
        });
        if (getdoctorInfo && (getdoctorInfo === null || getdoctorInfo === void 0 ? void 0 : getdoctorInfo.verified) === false) {
            throw new apiError_1.default(http_status_1.default.NOT_FOUND, "Please Verify Your Email First !");
        }
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(password, isUserExist.password);
    if (!isPasswordMatched) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "Password is not Matched !");
    }
    const { role, userId } = isUserExist;
    const accessToken = jwtHelper_1.JwtHelper.createToken({ role, userId }, config_1.default.jwt.secret, config_1.default.jwt.JWT_EXPIRES_IN);
    return { accessToken, user: { role, userId } };
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const VerificationUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { email: IEmail, password } = user;
    const isUserExist = yield prisma_1.default.auth.findUnique({
        where: { email: IEmail }
    });
    if (!isUserExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "User is not Exist !");
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(password, isUserExist.password);
    if (!isPasswordMatched) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "Password is not Matched !");
    }
    const { role, userId } = isUserExist;
    const accessToken = jwtHelper_1.JwtHelper.createToken({ role, userId }, config_1.default.jwt.secret, config_1.default.jwt.JWT_EXPIRES_IN);
    return { accessToken, user: { role, userId } };
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ResetPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = payload;
    // const isUserExist = await prisma.auth.findUnique({
    //     where: { email: email }
    // })
    // if (!isUserExist) {
    //     throw new ApiError(httpStatus.NOT_FOUND, "User is not Exist !");
    // }
    // if (isUserExist) {
    //     const clientUrl = "http://localhost:3000/reset-password/"
    //     const uniqueString = uuidv4() + isUserExist.id;
    //     const uniqueStringHashed = await bcrypt.hashSync(uniqueString, 12);
    //     const encodedUniqueStringHashed = uniqueStringHashed.replace(/\//g, '-');
    //     const resetLink = clientUrl + isUserExist.id + '/' + encodedUniqueStringHashed;
    //     const currentTime = moment();
    //     const expiresTime = moment(currentTime).add(4, 'hours');
    //     await prisma.$transaction(async (tx) => {
    //         //Check if the forgotPassword record exists before attempting reset
    //         const existingForgotPassword = await tx.forgotPassword.findUnique({
    //             where: { id: isUserExist.id }
    //         });
    //         if (existingForgotPassword) {
    //             await tx.forgotPassword.delete({
    //                 where: { id: isUserExist.id }
    //             })
    //         }
    //         const forgotPassword = await tx.forgotPassword.create({
    //             data: {
    //                 userId: isUserExist.id,
    //                 expiresAt: expiresTime.toDate(),
    //                 uniqueString: resetLink
    //             }
    //         });
    //         if (forgotPassword) {
    //             const pathName = "../../../template/resetPassword.html";
    //             const obj = {
    //                 link: resetLink
    //             };
    //             const replacementObj = obj;
    //             const subject = "Request to Reset Password";
    //             const fromMail = "healthyr@gmail.com"
    //             const toMail = isUserExist.email;
    //             EmailtTransporter({ pathName, replacementObj, fromMail, toMail, subject })
    //         }
    //         return forgotPassword;
    //     });
    // }
    // return {
    //     message: "Password Reset Successfully !!"
    // };
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PassworResetConfirm = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, uniqueString, password } = payload;
    // await prisma.$transaction(async (tx) => {
    //     const isUserExist = await tx.auth.findUnique({
    //         where: { id: userId }
    //     });
    //     if (!isUserExist) { throw new ApiError(httpStatus.NOT_FOUND, "User is not Exist !") };
    //     const resetLink = `http://localhost:3000/reset-password/${isUserExist.id}/${uniqueString}`
    //     const getForgotRequest = await tx.forgotPassword.findFirst({
    //         where: {
    //             userId: userId as string,
    //             uniqueString: resetLink
    //         }
    //     })
    //     if (!getForgotRequest) { throw new ApiError(httpStatus.NOT_FOUND, "Forgot Request was not found or Invalid !") };
    //     const expiresAt = moment(getForgotRequest.expiresAt);
    //     const currentTime = moment();
    //     if (expiresAt.isBefore(currentTime)) {
    //         throw new ApiError(httpStatus.NOT_FOUND, "Forgot Request has been expired !")
    //     } else {
    //         await tx.auth.update({
    //             where: {
    //                 id: userId
    //             },
    //             data: {
    //                 password: password && await bcrypt.hashSync(password, 12)
    //             }
    //         });
    //         await prisma.forgotPassword.delete({
    //             where: {
    //                 id: getForgotRequest.id
    //             }
    //         })
    //     }
    // });
    // return {
    //     message: "Password Changed Successfully !!"
    // }
});
exports.AuthService = {
    loginUser,
    VerificationUser,
    ResetPassword,
    PassworResetConfirm
};
