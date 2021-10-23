import * as express from 'express';
import utils from "./class/Utils";
import {router as userRouter} from './router/userRouter';
import {router as postRouter} from './router/postRouter';
import {router as commentRouter} from './router/commentRouter';
import {router as categoryRouter} from './router/categoryRouter';


const app: express.Application = express();

const baseUrlUser = "/api/users";
const baseUrlPost = "/api/posts";
const baseUrlComment = "/api/comments";
const baseUrlCategory = "/api/categories";
const baseUrlReaction = "/api/reactions";

// add middlewares
app.use(express.json());
app.use(utils.setHeadersCORS);

app.use(baseUrlUser, userRouter);
app.use(baseUrlPost, postRouter);
app.use(baseUrlComment, commentRouter);
app.use(baseUrlCategory, categoryRouter);


export default app;