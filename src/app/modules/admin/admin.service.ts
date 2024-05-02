import { Admin, UserRole } from "@prisma/client";
import prisma from "../../../shared/prisma";
import bcrypt from 'bcrypt';
import { EmailtTransporter } from "../../../helpers/emailTransporter";
import moment from "moment";
const { v4: uuidv4 } = require('uuid');

const sendVerificationEmail = async (data: Admin) => {
    const currentUrl = "http://localhost:6003/api/v1/auth/";
    const uniqueString = uuidv4() + data.id;
    const uniqueStringHashed = await bcrypt.hashSync(uniqueString, 12);

    const url = currentUrl + 'user/verify/' + data.id + '/' + uniqueString
    // const currentTime = moment();
    const expiresDate = moment().add(6, 'hours')
    const verficationData = await prisma.userVerfication.create({
        data: {
            userId: data.id,
            expiresAt: expiresDate.toDate(),
            uniqueString: uniqueStringHashed
        }
    })
    if (verficationData) {
        const pathName = "../../../template/verify.html"
        const obj = {
            link: url
        }
        const replacementObj = obj;
        const subject = "Email Verification"
        const fromMail = "subairasam8733260@gmail.com"
        const toMail = "asam.ugeng8385@gmail.com";
        EmailtTransporter({ pathName, replacementObj, fromMail, toMail, subject })
    }
}


const create = async (payload: any): Promise<any> => {
    const data = await prisma.$transaction(async (tx) => {
        const { password, ...othersData } = payload;
        const existEmail = await tx.auth.findUnique({ where: { email: othersData.email } });
        if (existEmail) {
            throw new Error("Email Already Exist !!")
        }
        const admin = await tx.admin.create({ data: othersData });
        await tx.auth.create({
            data: {
                email: admin.email,
                password: password && await bcrypt.hashSync(password, 12),
                role: UserRole.admin,
                userId: admin.id
            },
        });
        return admin
    });

    if (data.id) {
        sendVerificationEmail(data)
    }
    return data;

}


const getAdmin = async (id: string) => {
    const result = await prisma.admin.findUnique({
        where: {
            id: id
        }
    });
    return result;
}


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

export const AdminService = {
    create,
    getAdmin
}