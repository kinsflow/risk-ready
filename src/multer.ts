import multer from "multer"
import path from "path"

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
const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    // fileFilter
});

export default upload