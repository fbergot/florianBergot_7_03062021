import * as express from 'express';
import utils from "./class/Utils";
import {router as userRouter} from './router/userRouter';
import {router as postRouter} from './router/postRouter';
import {router as commentRouter} from './router/commentRouter';
import {router as categoryRouter} from './router/categoryRouter';
import {router as reactionRouter} from './router/reactionRouter';


const app: express.Application = express();

const baseUrlUser = "/api/users";
const baseUrlPost = "/api/posts";
const baseUrlComment = "/api/comments";
const baseUrlCategory = "/api/categories";
const baseUrlReaction = "/api/reactions";

// add middlewares
app.use(express.json());
app.use("/images", express.static("images"));
app.use(utils.setHeadersCORS);

// router
app.use(baseUrlUser, userRouter);
app.use(baseUrlPost, postRouter);
app.use(baseUrlComment, commentRouter);
app.use(baseUrlCategory, categoryRouter);
app.use(baseUrlReaction, reactionRouter);


export default app;