import Database from '../DB';
import ErrorHandler from '../ErrorHandler/errorhandler';

class CreateArticle {
    static async createArticle({
        title,
        article
    }, authorId) {
        const values = [title, article, authorId];
        const response = await Database.query('INSERT INTO articles(title, article, authorid) VALUES($1,$2, $3) RETURNING *', values).catch((error) => {
            throw new ErrorHandler(error.message, 400)
        });
        return response;
    }

}

export default CreateArticle;