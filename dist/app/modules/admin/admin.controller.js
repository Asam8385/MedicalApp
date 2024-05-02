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
exports.AdminController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const admin_service_1 = require("./admin.service");
const createAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.AdminService.create(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully Admin Created !!',
        success: true,
        data: result
    });
}));
const getAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.AdminService.getAdmin(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully Retrieve Admin !!',
        success: true,
        data: result,
    });
}));
// const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const result = await AdminService.getSingleAdmin(id);
//     sendResponse<IAdmin>(res, {
//         statusCode: 200,
//         message: 'Successfully Get Single Admin !!',
//         success: true,
//         data: result,
//     })
// })
// const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
//     const { id } = req.params;
//     await AdminService.deleteAdmin(id);
//     sendResponse<IAdmin>(res, {
//         statusCode: 200,
//         message: 'Successfully Deleted Admin !!',
//         success: true,
//     })
// })
// const updateAdmin = catchAsync(async (req: Request, res: Response) => {
//     const { ...adminInfo } = req.body;
//     const { id } = req.params;
//     const result = await AdminService.updateAdmin(id, adminInfo);
//     sendResponse<IAdmin>(res, {
//         statusCode: 200,
//         message: 'Successfully Updated Admin informations !!',
//         success: true,
//         data: result,
//     })
// })
exports.AdminController = {
    getAdmin,
    createAdmin
};
