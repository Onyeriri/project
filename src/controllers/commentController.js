import GifModel from '../models/gif';
import ArticleModel from '../models/article';
import CommentModel from '../models/comment';

class CommentController {
    static async createCommentArticle(req, res, next) {
        try {
            const article = await ArticleModel.getArticle(req.params.id);
            const response = await CommentModel.createCommentArticle(req.body.comment, article.articleid, req.auth.userId);

            const message = 'Comment successfully created';
            const data = {
                articleTitle: article.title,
                article: article.article,
                createdOn: response.createdon,
                message,
                comment: response.comment
            }

            res.status(201).json({
                status: 'success',
                data
            });
        } catch (error) {
            next(error);
        }
    }

    static async createCommentGif(req, res, next) {
        try {
            const gif = await GifModel.getGif(req.params.id);
            const response = await CommentModel.createCommentGif(req.body.comment, gif.gifid, req.auth.userId);
            const data = {
                message: 'comment successfully created',
                gifTitle: gif.title,
                createdOn: response.createdon,
                comment: response.comment
            }
            res.status(200).json({
                status: 'success',
                data
            })
        } catch (error) {
            next(error)
        }

    }
}

export default CommentController;