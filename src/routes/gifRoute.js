import {
    Router
} from 'express';
import Multer from 'multer';
import GifController from '../controllers/gifController';
import Cloudinary from '../middlewares/cloudinary_config';
import JWT from '../middlewares/jsonWebToken';
const storage = Multer.memoryStorage();
const upload = Multer({
    storage
}).single('image');

const route = Router()

route.post('/gifs', JWT.authenticate, upload, Cloudinary.upload, GifController.createGif);
route.delete('/gifs/:id', JWT.authenticate, GifController.deleteGif);
route.get('/gifs/:id', JWT.authenticate, GifController.getSpecificGif)

export default route;