import { Schema, model } from "mongoose";
import { IAdmin } from "./admin.interface";


const AdminSchema = new Schema<IAdmin>({
   
    firstName: {
            type: String,
            required: true,
        },
    lastName: {
            type: String,
            required: true,
        },
    address: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    }
});
export const AdminModel = model<IAdmin>('Admin', AdminSchema);