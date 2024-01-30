import express from "express";
import userController from "../controller/user-controller.js";
import postController from "../controller/post-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import commentController from "../controller/comment-controller.js";

// User API
const userRouter = new express.Router();
userRouter.use(authMiddleware);

userRouter.get("/api/users/current", userController.get);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

// Post API
const postRouter = new express.Router();
postRouter.use(authMiddleware);

postRouter.post("/api/posts", postController.create);
postRouter.put("/api/posts/:postId", postController.update);
postRouter.delete("/api/posts/:postId", postController.remove);

// Comment API
const commentRouter = new express.Router();
commentRouter.use(authMiddleware);

commentRouter.post("/api/posts/:postId/comments", commentController.create);
commentRouter.put(
  "/api/posts/:postId/comments/:commentId",
  commentController.update
);
commentRouter.delete(
  "/api/posts/:postId/comments/:commentId",
  commentController.remove
);

export { userRouter, postRouter, commentRouter };
