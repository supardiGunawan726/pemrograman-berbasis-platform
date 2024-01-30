import { validate } from "../validation/validation.js";
import {
  createCommentValidation,
  getCommentValidation,
  updateCommentValidation,
} from "../validation/comment-validation.js";
import { getPostValidation } from "../validation/post-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const checkPostMustExists = async (postId) => {
  postId = validate(getPostValidation, postId);

  const countPost = await prismaClient.post.count({
    where: {
      id: postId,
    },
  });

  if (countPost !== 1) {
    throw new ResponseError(404, "post is not found");
  }

  return postId;
};

const create = async (postId, request) => {
  postId = await checkPostMustExists(postId);

  const comment = validate(createCommentValidation, request);
  comment.postId = postId;

  return prismaClient.comment.create({
    data: comment,
    select: {
      id: true,
      message: true,
      createdAt: true,
      post: {
        select: {
          id: true,
          slug: true,
          title: true,
        },
      },
      user: {
        select: {
          username: true,
          name: true,
        },
      },
    },
  });
};

const get = async (postId, commentId) => {
  postId = await checkPostMustExists(postId);
  commentId = validate(getCommentValidation, commentId);

  const comment = await prismaClient.comment.findFirst({
    where: {
      postId: postId,
      id: commentId,
    },
    select: {
      id: true,
      message: true,
      createdAt: true,
      post: {
        select: {
          id: true,
          slug: true,
          title: true,
        },
      },
      user: {
        select: {
          username: true,
          name: true,
        },
      },
    },
  });

  if (!comment) {
    throw new ResponseError(404, "comment is not found");
  }

  return comment;
};

const update = async (user, postId, request) => {
  postId = await checkPostMustExists(postId);

  const comment = validate(updateCommentValidation, request);

  const totalCommentInDatabase = await prismaClient.comment.count({
    where: {
      postId: postId,
      username: user.username,
      id: comment.id,
    },
  });

  if (totalCommentInDatabase !== 1) {
    throw new ResponseError(404, "comment is not found");
  }

  return prismaClient.comment.update({
    where: {
      id: comment.id,
    },
    data: {
      message: comment.message,
    },
    select: {
      id: true,
      message: true,
      createdAt: true,
      post: {
        select: {
          id: true,
          slug: true,
          title: true,
        },
      },
      user: {
        select: {
          username: true,
          name: true,
        },
      },
    },
  });
};

const remove = async (user, postId, commentId) => {
  postId = await checkPostMustExists(postId);
  commentId = validate(getCommentValidation, commentId);

  const totalCommentInDatabase = await prismaClient.comment.count({
    where: {
      postId: postId,
      id: commentId,
      username: user.username,
    },
  });

  if (totalCommentInDatabase !== 1) {
    throw new ResponseError(404, "comment is not found");
  }

  return prismaClient.comment.delete({
    where: {
      id: commentId,
    },
  });
};

const list = async (postId) => {
  postId = await checkPostMustExists(postId);

  return prismaClient.comment.findMany({
    where: {
      postId: postId,
    },
    select: {
      id: true,
      message: true,
      createdAt: true,
      post: {
        select: {
          id: true,
          slug: true,
          title: true,
        },
      },
      user: {
        select: {
          username: true,
          name: true,
        },
      },
    },
  });
};

export default { create, get, update, remove, list };
