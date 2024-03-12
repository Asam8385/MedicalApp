import nodemailer from 'nodemailer';
import config from '../config';

export const Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "subairasam8733260@gmail.com",
        pass: "nasazuigpioownuc"
    }
});
