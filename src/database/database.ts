import { MongoClient, Db, Collection } from 'mongodb';
import * as dotenv from 'dotenv';

let db: Db;

export let NewsCollection: Collection<any>;

async function connectToDatabase(): Promise<void> {
    dotenv.config();

    const url = process.env.DB_URL || 'mongodb://0.0.0.1:27017';
    const dbName = process.env.DB_NAME;
    const client = new MongoClient(url);

    try {
        await client.connect();
        db = client.db(dbName);
        NewsCollection = db.collection('news');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; // Throw the error to handle it in the calling code
    }
}

export function getDb(): Db {
    if (!db) {
        throw new Error('Database connection has not been initialized');
    }
    return db;
}

export default connectToDatabase;
