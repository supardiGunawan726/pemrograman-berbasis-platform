import express from "express";
import userController from "../controller/user-controller.js";
import postController from "../controller/post-controller.js";
import commentController from "../controller/comment-controller.js";

const publicRouter = new express.Router();
publicRouter.post("/api/users", userController.register);
publicRouter.post("/api/users/login", userController.login);
publicRouter.get("/api/posts/", postController.search);
publicRouter.get("/api/posts/:postId", postController.get);
publicRouter.get(
  "/api/posts/:postId/comments/:commentId",
  commentController.get
);
publicRouter.get("/api/posts/:postId/comments", commentController.list);

export { publicRouter };
