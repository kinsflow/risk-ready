import NodeMailer from "../services/NodeMailer"
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const emailVerification = (email: string, token: number) => {
    var mailOptions = {
        from: process.env.MAIL_FROM_ADDRESS,
        to: email,
        subject: 'Email Verification',
        template: 'email-verification',
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
}

export default emailVerification