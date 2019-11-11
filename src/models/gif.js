import Database from '../DB';
import ErrorHandler from '../ErrorHandler/errorhandler';

class GifModel {
    static async createGif(title, url, authorId) {
        const values = [title, url, authorId];
        const response = await Database.query('INSERT INTO gifs(title, imageurl, authorid) VALUES($1,$2, $3) RETURNING *', values).catch((error) => {
            throw new ErrorHandler(error.message, 400)
        });
        return response;
    }

}

export default GifModel;