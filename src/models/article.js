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
    static async getArticle(id) {
        const values = [id];
        const response = await Database.query('SELECT * FROM articles WHERE articleid = $1', values).catch(
            (error) => {
                throw new ErrorHandler(error.message, 400);
            }
        )
        if (!response) {
            throw new Error('Article does not exist')
        }
        return response;
    }

    static async EditArticle({
        title,
        article
    }, id, authorId) {
        const values = [title, article, id, authorId];
        const response = await Database.query('UPDATE articles SET title = $1, article = $2 WHERE articleid = $3 AND authorid = $4 RETURNING *', values).catch((error) => {
            throw new Error(error.message)
        })
        return response;
    }

    static async DeleteArticle(id, authorId) {
        const values = [id, authorId];
        await Database.query('DELETE FROM articles WHERE articleid = $1 AND authorid = $2', values).catch(error => {
            throw new Error(error.message)
        })
    }

    static async getAllArticles() {
        const response = await Database.query('SELECT * FROM articles ORDER BY articleid DESC', '', true).catch(
            (error) => {
                throw new Error(error.message);
            }
        )
        return response;
    }

}

export default CreateArticle;