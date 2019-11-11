import GifModel from '../models/gif'
import ErrorHandler from '../ErrorHandler/errorhandler';


class GifController {
    static async createGif(req, res, next) {
        try {
            const gif = await GifModel.createGif(req.body.title, req.url, req.auth.userId);
            console.log('gif controller', gif)
            if (!gif) {
                throw new ErrorHandler('something bad happened', 400);
            }
            const message = 'GIF image successfully posted';
            const data = {
                ...gif,
                message
            };
            res.status(201).json({
                status: 'success',
                data
            });
        } catch (error) {
            next(error);
        }
    }
}

export default GifController;