import Router from 'koa-router';
import { Context } from 'koa';
import { NewsController } from '../controllers/newsController';

const newsRouter = new Router();
const newsController = new NewsController();

newsRouter.get('/news', async (ctx: Context) => {
    await newsController.getNews(ctx);
});

newsRouter.get('/news/:id', async (ctx: Context) => {
    await newsController.getNewsById(ctx);
});

newsRouter.post('/news', async (ctx: Context) => {
    await newsController.createNews(ctx);
});

newsRouter.put('/news/:id', async (ctx: Context) => {
    await newsController.updateNews(ctx);
});

newsRouter.delete('/news/:id', async (ctx: Context) => {
    await newsController.deleteNews(ctx);
});

export default newsRouter;