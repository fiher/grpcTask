"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsService = void 0;
const newsRepository_1 = require("../repository/newsRepository");
class NewsService {
    constructor(repository = new newsRepository_1.NewsRepository()) {
        this.repository = repository;
    }
    async getNews(date, title, sortByDate, sortByTitle) {
        const filterOptions = {};
        if (date) {
            filterOptions.date = date;
        }
        if (title) {
            filterOptions.title = title;
        }
        const sortOptions = {};
        if (sortByDate !== undefined && sortByDate !== null) {
            sortOptions.date = sortByDate;
        }
        if (sortByTitle !== undefined && sortByTitle !== null) {
            sortOptions.title = sortByTitle;
        }
        return await this.repository.getFilteredAndSortedNews(filterOptions, sortOptions);
    }
    async getNewsById(id) {
        const news = await this.repository.getNewsById(id);
        if (!news) {
            throw new Error(newsRepository_1.NEWS_NOT_FOUND_ERROR);
        }
        return news;
    }
    async createNews(news) {
        try {
            return await this.repository.createNews(news);
        }
        catch (error) {
            throw new Error(newsRepository_1.NEWS_CREATE_ERROR);
        }
    }
    async updateNews(id, updatedNews) {
        const existingNews = await this.getNewsById(id);
        if (!existingNews) {
            throw new Error(newsRepository_1.NEWS_NOT_FOUND_ERROR);
        }
        try {
            return await this.repository.updateNews(id, updatedNews);
        }
        catch (error) {
            throw new Error(newsRepository_1.NEWS_UPDATE_ERROR);
        }
    }
    async deleteNews(id) {
        const existingNews = await this.getNewsById(id);
        if (!existingNews) {
            throw new Error(newsRepository_1.NEWS_NOT_FOUND_ERROR);
        }
        try {
            return await this.repository.deleteNews(id);
        }
        catch (error) {
            throw new Error(newsRepository_1.NEWS_DELETE_ERROR);
        }
    }
}
exports.NewsService = NewsService;
