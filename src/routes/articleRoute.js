import {
    Router
} from 'express';
import ArticleController from '../controllers/articleController';
import JWT from '../middlewares/jsonWebToken';

const route = Router()

route.post('/articles', JWT.authenticate, ArticleController.createArticle);

export default route;