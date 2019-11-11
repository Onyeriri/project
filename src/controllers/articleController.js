import ArticleModel from '../models/article'
import ErrorHandler from '../ErrorHandler/errorhandler';


class ArticleController {
    static async createArticle(req, res, next) {
        try {
            const article = await ArticleModel.createArticle(req.body, req.auth.userId);
            if (!article) {
                throw new ErrorHandler('something bad happened', 400);
            }
            const message = 'Article successfully posted';
            const data = {
                ...article,
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

export default ArticleController;