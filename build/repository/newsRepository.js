"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsRepository = exports.NEWS_FETCH_ERROR = exports.NEWS_DELETE_ERROR = exports.NEWS_UPDATE_ERROR = exports.NEWS_CREATE_ERROR = exports.NEWS_NOT_FOUND_ERROR = void 0;
const mongodb_1 = require("mongodb");
const database_1 = require("../database/database");
exports.NEWS_NOT_FOUND_ERROR = 'News not found.';
exports.NEWS_CREATE_ERROR = 'Error creating news.';
exports.NEWS_UPDATE_ERROR = 'Error updating news.';
exports.NEWS_DELETE_ERROR = 'Error deleting news.';
exports.NEWS_FETCH_ERROR = 'Error fetching news.';
class NewsRepository {
    constructor(newsCollection = database_1.NewsCollection) {
        this.newsCollection = newsCollection;
    }
    async getNewsById(id) {
        try {
            const objectId = new mongodb_1.ObjectId(id);
            const news = await this.newsCollection.findOne({ _id: objectId });
            if (!news) {
                throw new Error(exports.NEWS_NOT_FOUND_ERROR);
            }
            return news;
        }
        catch (error) {
            console.error(exports.NEWS_NOT_FOUND_ERROR, error);
            throw new Error(exports.NEWS_NOT_FOUND_ERROR);
        }
    }
    async createNews(news) {
        try {
            const result = await this.newsCollection.insertOne(news);
            return { ...news, _id: result.insertedId };
        }
        catch (error) {
            console.error(exports.NEWS_CREATE_ERROR, error);
            throw new Error(exports.NEWS_CREATE_ERROR);
        }
    }
    async updateNews(id, updatedNews) {
        try {
            const objectId = new mongodb_1.ObjectId(id);
            const result = await this.newsCollection.findOneAndUpdate({ _id: objectId }, { $set: updatedNews }, { returnDocument: 'after' });
            return { ...result };
        }
        catch (error) {
            console.error(exports.NEWS_UPDATE_ERROR, error);
            throw new Error(exports.NEWS_UPDATE_ERROR);
        }
    }
    async deleteNews(id) {
        try {
            const objectId = new mongodb_1.ObjectId(id);
            const result = await this.newsCollection.deleteOne({ _id: objectId });
            return result.deletedCount === 1;
        }
        catch (error) {
            console.error(exports.NEWS_DELETE_ERROR, error);
            throw new Error(exports.NEWS_DELETE_ERROR);
        }
    }
    async getFilteredAndSortedNews(filterOptions, sortOptions) {
        try {
            return await this.newsCollection.find(filterOptions).sort(sortOptions).toArray();
        }
        catch (error) {
            console.error(exports.NEWS_FETCH_ERROR, error);
            throw new Error(exports.NEWS_FETCH_ERROR);
        }
    }
}
exports.NewsRepository = NewsRepository;
