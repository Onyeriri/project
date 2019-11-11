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

    static async deleteGif(id, authorId) {
        const values = [id, authorId];
        await Database.query('DELETE FROM gifs WHERE gifid = $1 AND authorid = $2', values).catch(
            (error) => {
                throw new Error(error.message);
            }
        )

    }

}

export default GifModel;