import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post('/login', AuthController.Login);
router.post('/reset-password', AuthController.ResetPassword);
router.post('/reset-password/confirm', AuthController.PasswordResetConfirm);
router.get('/user/verify/:userId/', AuthController.VerifyUser);
router.get('/count/', AuthController.Count);
router.get('/verified', AuthController.Verified);

export const AuthRouter = router;