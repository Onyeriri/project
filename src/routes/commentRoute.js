import { Router } from 'express';
import CommentController from '../controllers/commentController';
import JWT from '../middlewares/jsonWebToken';

const route = Router();

route.post(
  '/articles/:id/comment',
  JWT.authenticate,
  CommentController.createCommentArticle,
);
route.post(
  '/gifs/:id/comment',
  JWT.authenticate,
  CommentController.createCommentGif,
);

export default route;
