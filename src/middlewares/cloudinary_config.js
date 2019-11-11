import cloudinary from 'cloudinary';
import ErrorHandler from '../ErrorHandler/errorhandler';
import 'dotenv/config';
import Datauri from 'datauri';

const datauri = new Datauri();
cloudinary.config(process.env.CLOUDINARY_URL);

class Cloudinary {
    static upload(req, res, next) {
        try {
            if (req.file.mimetype !== 'image/gif') {
                throw new ErrorHandler('Image is not in gif format', 400);
            }
            const image = datauri.format('gif', req.file.buffer).content;
            cloudinary.uploader.upload(image).then(response => {
                req.url = response.url
                next()
            }).catch(error => next(error));
        } catch (error) {
            next(error)
        }
    }
}

export default Cloudinary;