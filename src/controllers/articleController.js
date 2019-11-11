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

    static async editArticle(req, res, next) {
        try {
            await ArticleModel.getArticle(req.params.id);
            const article = await ArticleModel.EditArticle(req.body, req.params.id, req.auth.userId);
            const message = 'Article successfully updated';
            const data = {
                ...article,
                message
            }
            res.status(200).json({
                status: 'success',
                data
            })
        } catch (error) {
            next(error)
        }

    }

    static async deleteArticle(req, res, next) {
        try {
            await ArticleModel.getArticle(req.params.id);
            await ArticleModel.DeleteArticle(req.params.id, req.auth.userId);
            const data = {
                message: 'Article successfully deleted'
            };
            res.status(200).json({
                status: 'success',
                data
            })
        } catch (error) {
            next(error);
        }
    }

    static async getArticles(req, res, next) {
        try {
            const articles = await ArticleModel.getAllArticles()
            const data = [...articles];
            res.status(200).json({
                status: 'success',
                data
            })
        } catch (error) {
            next(error);
        }
    }
}

export default ArticleController;