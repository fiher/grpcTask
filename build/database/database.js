"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = exports.NewsCollection = void 0;
const mongodb_1 = require("mongodb");
const url = process.env.DB_URL || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'your_database_name';
let db;
async function connectToDatabase() {
    const client = new mongodb_1.MongoClient(url);
    try {
        await client.connect();
        db = client.db(dbName);
        exports.NewsCollection = db.collection('news');
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; // Throw the error to handle it in the calling code
    }
}
function getDb() {
    if (!db) {
        throw new Error('Database connection has not been initialized');
    }
    return db;
}
exports.getDb = getDb;
exports.default = connectToDatabase;
