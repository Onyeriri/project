import { Router } from 'express';
import ArticleController from '../controllers/articleController';
import JWT from '../middlewares/jsonWebToken';

const route = Router();

route.post('/articles', JWT.authenticate, ArticleController.createArticle);
route.patch('/articles/:id', JWT.authenticate, ArticleController.editArticle);
route.delete(
  '/articles/:id',
  JWT.authenticate,
  ArticleController.deleteArticle,
);
route.get('/feed', JWT.authenticate, ArticleController.getArticles);
route.get(
  '/articles/:id',
  JWT.authenticate,
  ArticleController.getSpecificArticle,
);

export default route;
