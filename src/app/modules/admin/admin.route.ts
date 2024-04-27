import express from 'express';
import { AdminController } from './admin.controller';
const router = express.Router();

router.post('/', AdminController.createAdmin);
// router.get('/:id', AdminController.getSingleAdmin);
router.get('/:id', AdminController.getAdmin);
// router.patch('/:id', AdminController.updateAdmin);
// router.delete('/:id', AdminController.deleteAdmin);

export const AdminRouter = router;