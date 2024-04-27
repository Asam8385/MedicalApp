import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";
import config from "../../../config";
import path from 'path';
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";

const Login = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.loginUser(req.body);
    const { accessToken } = result;

    const cookieOptions = {
        secure: config.env === 'production',
        httpOnly: true
    }
    res.cookie('accessToken', accessToken, cookieOptions)
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Logged !!',
        success: true,
        data: result,
    })
})
const ResetPassword = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.ResetPassword(req.body);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Passwrod Reset!!',
        success: true,
        data: result,
    })
})

const PasswordResetConfirm = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.PassworResetConfirm(req.body);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Passwrod Changed!!',
        success: true,
        data: result,
    })
})

const VerifyUser = catchAsync(async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const isUserExist = await prisma.doctor.findUnique({
            where: {
                id: userId
            }
        })
        if (!isUserExist) {
            throw new ApiError(httpStatus.NOT_FOUND, "User is not found !!");
        }
        const getVerficationUser = await prisma.userVerfication.findFirst({
            where: {
                userId: userId
            }
        })
        if (getVerficationUser) {
         
                await prisma.$transaction(async (tx) => {
                    await tx.doctor.update({
                        where: {
 
                            id: isUserExist.id
                        },
                        data: {
                            verified: true
                        }
                    });
                    await tx.userVerfication.delete({
                        where: {
                            id: getVerficationUser.id
                        }
                    })
                })
                sendResponse(res, {
                    statusCode: 200,
                    message: 'Successfully doctor is Verified!!',
                    success: true,
                })
        }
    } catch (error) {
        throw new ApiError(httpStatus.NOT_FOUND, "Internal Server Error" + error);
    }
})


const Count = catchAsync(async (req: Request, res: Response) => {
    try {
        const docCount = await prisma.doctor.count()
        const appointmentCount =  await prisma.appointments.count()
        const patientCount =  await prisma.patient.count()
        const doctors = await prisma.doctor.findMany();
        const appointments = await prisma.appointments.findMany();
        const patients = await prisma.patient.findMany();
        const data = {
            docCount,
            appointmentCount,
            patientCount,
            doctors,
            appointments,
            patients
        };


        sendResponse(res, {
            statusCode: 200,
            message: 'ok!!',
            success: true,
            data : data
        })

    } catch (error) {
        throw new ApiError(httpStatus.NOT_FOUND, "Internal Server Error" + error);
    }
})


const Verified = catchAsync(async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../../template/verfied.html"))
})


export const AuthController = {
    Login,
    VerifyUser,
    Count,
    Verified,
    ResetPassword,
    PasswordResetConfirm
}