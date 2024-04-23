"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const newsController_1 = require("../controllers/newsController");
const newsRouter = new koa_router_1.default();
const newsController = new newsController_1.NewsController();
newsRouter.get('/news', async (ctx) => {
    await newsController.getNews(ctx);
});
newsRouter.get('/news/:id', async (ctx) => {
    await newsController.getNewsById(ctx);
});
newsRouter.post('/news', async (ctx) => {
    await newsController.createNews(ctx);
});
newsRouter.put('/news/:id', async (ctx) => {
    await newsController.updateNews(ctx);
});
newsRouter.delete('/news/:id', async (ctx) => {
    await newsController.deleteNews(ctx);
});
exports.default = newsRouter;
