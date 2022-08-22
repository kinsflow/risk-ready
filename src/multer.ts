import multer from "multer"
import path from "path"
import aws from 'aws-sdk';
import multers3 from 'multer-s3';
import { } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

aws.config.update({
    region: "us-east-2",
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY
    }
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(new Error('invalid file format'), false)
    }
}
const multerLocal = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    // fileFilter
});

const multerS3 = multer({
    fileFilter,
    storage: multers3({
        acl: "public-read",
        s3: (new aws.S3() as any),
        bucket: 'risk-ready',
        contentType: multers3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, Object.assign({}, (req as any).body));
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString());
        },
    }),
});

const upload = process.env.NODE_ENV == 'local' ? multerLocal : multerS3;

export const awss = aws
export default upload