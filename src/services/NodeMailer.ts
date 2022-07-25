import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';

dotenv.config();
const viewPath = path.resolve(__dirname, '../templates/views/');
const partialsPath = path.resolve(__dirname, '../templates/partials');

const NodeMailer = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 2525,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});

NodeMailer.use('compile', hbs({
    viewEngine: {
        extname: '.handlebars',
        layoutsDir: viewPath,
        defaultLayout: false,
        partialsDir: partialsPath,
    },
    viewPath: viewPath,
    extName: '.handlebars',
}))

export default NodeMailer;