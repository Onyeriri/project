import Database from '../DB';
import ErrorHandler from '../ErrorHandler/errorhandler';

class CommentModel {
  static async createCommentArticle(comment, articleId, authorId) {
    const values = [comment, articleId, authorId];
    const response = await Database.query(
      'INSERT INTO comments_articles(comment, articleid, authorid) VALUES($1,$2, $3) RETURNING *',
      values,
    ).catch((error) => {
      throw new ErrorHandler(error.message, 400);
    });
    return response;
  }

  static async createCommentGif(comment, gifId, authorId) {
    const values = [comment, gifId, authorId];
    const response = await Database.query(
      'INSERT INTO comments_gifs(comment, gifid, authorid) VALUES($1,$2, $3) RETURNING *',
      values,
    ).catch((error) => {
      throw new ErrorHandler(error.message, 400);
    });
    return response;
  }

  static async getArticleComments(articleid) {
    const value = [articleid];
    const response = await Database.query(
      'SELECT * FROM comments_articles WHERE articleid = $1',
      value,
      true,
    ).catch((error) => {
      throw new Error(error.message);
    });
    if (!response) {
      throw new ErrorHandler('comments not found', 404);
    }
    return response;
  }

  static async getGifComments(gifid) {
    const value = [gifid];
    const response = await Database.query(
      'SELECT * FROM comments_gifs WHERE gifid = $1',
      value,
      true,
    ).catch((error) => {
      throw new Error(error.message);
    });
    if (!response) {
      throw new ErrorHandler('comments not found', 404);
    }
    return response;
  }
}

export default CommentModel;
