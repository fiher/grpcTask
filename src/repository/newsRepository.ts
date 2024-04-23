import { Collection, ObjectId } from 'mongodb';
import { News } from '../models/NewsModel';
import {INewsRepository} from "./INewsRepository";
import {NewsCollection} from "../database/database";

export const NEWS_NOT_FOUND_ERROR = 'News not found.';
export const NEWS_CREATE_ERROR = 'Error creating news.';
export const NEWS_UPDATE_ERROR = 'Error updating news.';
export const NEWS_DELETE_ERROR = 'Error deleting news.';
export const NEWS_FETCH_ERROR = 'Error fetching news.';

export class NewsRepository implements INewsRepository {
    private newsCollection: Collection<News>;

    constructor(newsCollection: Collection<News> = NewsCollection) {
        this.newsCollection = newsCollection;
    }

    async getNewsById(id: string): Promise<News> {
        try {
            const objectId = new ObjectId(id);
            const news = await this.newsCollection.findOne({ _id: objectId });
            if (!news) {
                throw new Error(NEWS_NOT_FOUND_ERROR);
            }
            return news;
        } catch (error) {
            console.error(NEWS_NOT_FOUND_ERROR, error);
            throw new Error(NEWS_NOT_FOUND_ERROR);
        }
    }

    async createNews(news: News): Promise<News> {
        try {
            const result = await this.newsCollection.insertOne(news);
            return { ...news, _id: result.insertedId };
        } catch (error) {
            console.error(NEWS_CREATE_ERROR, error);
            throw new Error(NEWS_CREATE_ERROR);
        }
    }

    async updateNews(id: string, updatedNews: Partial<News>): Promise<News> {
        try {
            const objectId = new ObjectId(id);
            const result = await this.newsCollection.findOneAndUpdate(
                { _id: objectId },
                { $set: updatedNews },
                { returnDocument: 'after' }
            );

            return {...result} as News;

        } catch (error) {
            console.error(NEWS_UPDATE_ERROR, error);
            throw new Error(NEWS_UPDATE_ERROR);
        }
    }

    async deleteNews(id: string): Promise<boolean> {
        try {
            const objectId = new ObjectId(id);
            const result = await this.newsCollection.deleteOne({ _id: objectId });
            return result.deletedCount === 1;
        } catch (error) {
            console.error(NEWS_DELETE_ERROR, error);
            throw new Error(NEWS_DELETE_ERROR);
        }
    }

    async getFilteredAndSortedNews(filterOptions: any, sortOptions: any): Promise<News[]> {
        try {
            return await this.newsCollection.find(filterOptions).sort(sortOptions).toArray();
        } catch (error) {
            console.error(NEWS_FETCH_ERROR, error);
            throw new Error(NEWS_FETCH_ERROR);
        }
    }
}
