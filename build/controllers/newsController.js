"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsController = void 0;
const newsService_1 = require("../service/newsService");
const serverError_1 = require("../errors/serverError");
const notFoundError_1 = require("../errors/notFoundError");
class NewsController {
    constructor(service = new newsService_1.NewsService()) {
        this.service = service;
    }
    async getNews(ctx) {
        try {
            const { date, title, sortByDate, sortByTitle } = ctx.request.query;
            const news = await this.service.getNews(date, title, sortByDate, sortByTitle);
            ctx.status = 200;
            ctx.body = news;
        }
        catch (error) {
            if (error instanceof serverError_1.ServerError) {
                ctx.status = 500;
                ctx.body = { error: error.message };
            }
        }
    }
    async getNewsById(ctx) {
        try {
            const id = ctx.params.id;
            const news = await this.service.getNewsById(id);
            ctx.body = news;
        }
        catch (error) {
            if (error instanceof notFoundError_1.NotFoundError) {
                ctx.status = 404;
                ctx.body = { error: error.message };
            }
        }
    }
    async createNews(ctx) {
        try {
            const news = ctx.request.body;
            const createdNews = await this.service.createNews(news);
            ctx.status = 201;
            ctx.body = createdNews;
        }
        catch (error) {
            if (error instanceof serverError_1.ServerError) {
                ctx.status = 400;
                ctx.body = { error: error.message };
            }
        }
    }
    async updateNews(ctx) {
        try {
            const id = ctx.params.id;
            const newsToUpdate = ctx.request.body;
            const news = await this.service.updateNews(id, newsToUpdate);
            ctx.status = 204;
            ctx.body = news;
        }
        catch (error) {
            if (error instanceof serverError_1.ServerError) {
                ctx.status = 400;
                ctx.body = { error: error.message };
            }
        }
    }
    async deleteNews(ctx) {
        try {
            const id = ctx.params.id;
            const deleted = await this.service.deleteNews(id);
            ctx.body = { success: deleted };
        }
        catch (error) {
            if (error instanceof serverError_1.ServerError) {
                ctx.status = 400;
                ctx.body = { error: error.message };
            }
        }
    }
}
exports.NewsController = NewsController;
