import {News} from "../models/NewsModel";

export interface INewsRepository {
    getNewsById(id: string): Promise<News>;
    createNews(news: News): Promise<News>;
    updateNews(id: string, updatedNews: Partial<News>): Promise<News>;
    deleteNews(id: string): Promise<boolean>;
    getFilteredAndSortedNews(filterOptions: any, sortOptions: any): Promise<News[]>;
}