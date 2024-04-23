import { ObjectId, WithId, Document} from 'mongodb';

// Define interface for News document
export interface News extends WithId<Document>{
    _id: ObjectId;
    date: string;
    title: string;
    shortDescription: string;
    text: string;
}