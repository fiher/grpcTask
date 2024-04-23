import {News} from "../models/NewsModel";

export interface INewsService {
    getNews(date?: string, title?: string, sortByDate?: number, sortByTitle?: number): Promise<News[]>;
    getNewsById(id: string):  Promise<News | null>;
    createNews(news: News): Promise<News>;
    updateNews(id: string, updatedNews: Partial<News>): Promise<News | null>;
    deleteNews(id: string): Promise<boolean>;
}