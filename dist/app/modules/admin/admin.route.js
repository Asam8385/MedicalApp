"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRouter = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const router = express_1.default.Router();
router.post('/', admin_controller_1.AdminController.createAdmin);
// router.get('/:id', AdminController.getSingleAdmin);
router.get('/:id', admin_controller_1.AdminController.getAdmin);
// router.patch('/:id', AdminController.updateAdmin);
// router.delete('/:id', AdminController.deleteAdmin);
exports.AdminRouter = router;
