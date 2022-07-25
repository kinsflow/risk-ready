import NodeMailer from "../services/NodeMailer"
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const emailVerification = (email: string) => {
    var mailOptions = {
        from: process.env.MAIL_FROM_ADDRESS,
        to: email,
        subject: 'Sending Email using Node.js',
        template: 'index',
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