import { Context } from 'koa';
import { INewsService } from "../service/INewsService";
import {NewsService} from "../service/newsService";
import {ServerError} from "../errors/serverError";
import {NotFoundError} from "../errors/notFoundError";
import {News} from "../models/NewsModel";

export class NewsController {
    private service: INewsService;

    constructor(service: INewsService = new NewsService()) {
        this.service = service;
    }

    async getNews(ctx: Context): Promise<void> {
        try {
            const { date, title, sortByDate, sortByTitle } = ctx.request.query;
            const news = await this.service.getNews(date as string, title as string, sortByDate as any, sortByTitle as any);
            ctx.status = 200;
            ctx.body = news;
        } catch (error) {
            if (error instanceof ServerError) {
                ctx.status = 500;
                ctx.body = { error: error.message };
            }

        }
    }

    async getNewsById(ctx: Context): Promise<void> {
        try {
            const id = ctx.params.id;
            const news = await this.service.getNewsById(id);
            ctx.body = news;
        } catch (error) {
            if (error instanceof NotFoundError) {
                ctx.status = 404;
                ctx.body = { error: error.message };
            }
        }
    }

    async createNews(ctx: Context): Promise<void> {
        try {
            const news = ctx.request.body as News;
            const createdNews = await this.service.createNews(news);
            ctx.status = 201;
            ctx.body = createdNews;
        } catch (error) {
            if (error instanceof ServerError) {
                ctx.status = 400;
                ctx.body = { error: error.message };
            }
        }
    }

    async updateNews(ctx: Context): Promise<void> {
        try {
            const id = ctx.params.id;
            const newsToUpdate = ctx.request.body as Partial<News>;
            const news = await this.service.updateNews(id, newsToUpdate);
            ctx.status = 204;
            ctx.body = news;
        } catch (error) {
            if (error instanceof ServerError) {
                ctx.status = 400;
                ctx.body = { error: error.message };
            }
        }
    }

    async deleteNews(ctx: Context): Promise<void> {
        try {
            const id = ctx.params.id;
            const deleted = await this.service.deleteNews(id);
            ctx.body = { success: deleted };
        } catch (error) {
            if (error instanceof ServerError) {
                ctx.status = 400;
                ctx.body = { error: error.message };
            }
        }
    }
}