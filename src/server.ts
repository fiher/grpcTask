import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import connectToDatabase, {getDb} from "./database/database";
import newsRoutes from './routes/newsRoutes';
const app = new Koa();

// Middlewares
app.use(bodyParser());

app.use(newsRoutes.routes()).use(newsRoutes.allowedMethods());

connectToDatabase().then(() => {
    app.context.db = getDb();
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}) .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

