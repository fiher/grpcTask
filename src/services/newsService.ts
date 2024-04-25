import {
    NewsRepository,
    NEWS_UPDATE_ERROR,
    NEWS_DELETE_ERROR,
    NEWS_CREATE_ERROR,
    NEWS_NOT_FOUND_ERROR
} from "../repository/newsRepository";
import { News } from '../models/news';
import {INewsRepository} from "../repository/INewsRepository";
import {INewsService} from "./INewsService";
import {NotFoundError} from "../errors/notFoundError";
import {ServerError} from "../errors/serverError";

export class NewsService  implements INewsService{
    private repository: INewsRepository;

    constructor(repository: INewsRepository = new NewsRepository()) {
        this.repository = repository;
    }

    async getNews(date?: string, title?: string, sortByDate?: number, sortByTitle?: number): Promise<News[]> {
        const filterOptions: any = {};
        if (date) {
            filterOptions.date = date;
        }
        if (title) {
            filterOptions.title = title;
        }

        const sortOptions: any = {};
        if (sortByDate !== undefined && sortByDate !== null) {
            sortOptions.date = sortByDate;
        }
        if (sortByTitle !== undefined && sortByTitle !== null) {
            sortOptions.title = sortByTitle;
        }

        return await this.repository.getFilteredAndSortedNews(filterOptions, sortOptions);
    }

    async getNewsById(id: string): Promise<News | null> {
        const news = await this.repository.getNewsById(id);
        if (!news) {
            throw new NotFoundError(NEWS_NOT_FOUND_ERROR);
        }
        return news;
    }

    async createNews(news: News): Promise<News> {
        try {
            return await this.repository.createNews(news);
        } catch (error) {
            throw new ServerError(NEWS_CREATE_ERROR);
        }
    }

    async updateNews(id: string, updatedNews: Partial<News>): Promise<News | null> {
        const existingNews = await this.getNewsById(id);
        if (!existingNews) {
            throw new NotFoundError(NEWS_NOT_FOUND_ERROR);
        }
        try {
            return await this.repository.updateNews(id, updatedNews);
        } catch (error) {
            throw new ServerError(NEWS_UPDATE_ERROR);
        }
    }

    async deleteNews(id: string): Promise<boolean> {
        const existingNews = await this.getNewsById(id);
        if (!existingNews) {
            throw new NotFoundError(NEWS_NOT_FOUND_ERROR);
        }
        try {
            return await this.repository.deleteNews(id);
        } catch (error) {
            throw new ServerError(NEWS_DELETE_ERROR);
        }
    }
}
