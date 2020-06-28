import multer from 'multer'
import path from 'path'

const uploadConfig = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })
}

export default uploadConfig