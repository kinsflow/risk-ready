import NodeMailer from "../services/NodeMailer"
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const forgotPassword = (email: string, token: number) => {

    try {
        var mailOptions = {
            from: process.env.MAIL_FROM_ADDRESS,
            to: email,
            subject: 'Forgot Password',
            template: 'forgot-password',
            context: {
                token
            }
            // attachments: [
            //     { filename: 'abc.jpg', path: path.resolve(__dirname, './image/abc.jpg') }
            // ]
        };

        NodeMailer.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        })
    } catch (error: any) {
        throw error.response
    }
}

export default forgotPassword