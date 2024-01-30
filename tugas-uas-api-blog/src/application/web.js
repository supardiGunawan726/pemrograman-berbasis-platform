import express from "express";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { commentRouter, postRouter, userRouter } from "../route/api.js";

export const web = express();
web.use(express.json());

web.use(publicRouter);
web.use(userRouter);
web.use(postRouter);
web.use(commentRouter);

web.use(errorMiddleware);
