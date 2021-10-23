import * as express from 'express';
import utils from "./class/Utils";
import router from './router/userRouter';


const app: express.Application = express();

// add middlewares
app.use(express.json());
app.use(utils.setHeadersCORS);

const baseUrlUser = "/api/users";
const baseUrlPost = "/api/posts";
const baseUrlComment = "/api/comments";
const baseUrlCategory = "/api/categories";
const baseUrlReaction = "/api/reactions";

app.use(baseUrlUser, router);


export default app;