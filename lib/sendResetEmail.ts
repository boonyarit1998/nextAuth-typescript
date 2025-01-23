import nodemailer, { TransportOptions } from 'nodemailer';

type Props = {email : string , resetUrl : string}


export async function sendResetEmail({email,resetUrl}: Props) {
    const transporter = nodemailer.createTransport(<TransportOptions>{
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: process.env.SMTP_USER, // SMTP username
            pass: process.env.SMTP_PASSWORD, // SMTP password
    },
    });

    await transporter.sendMail({
        from : process.env.SMTP_USER,
        to: email,
        subject :"Reset Your Password",
        html :`<p>Click this link to reset your password <a href=${resetUrl}></a></p>`

    });

}