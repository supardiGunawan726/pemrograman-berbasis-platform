import { prismaClient } from "../application/database.js";
import {
  createPostValidation,
  getPostValidation,
  searchPostValidation,
  updatePostValidation,
} from "../validation/post-validation.js";
import { validate } from "../validation/validation.js";
import { ResponseError } from "../error/response-error.js";

const create = async (user, request) => {
  const post = validate(createPostValidation, request);
  post.authorId = user.username;

  const countPostBySlug = await prismaClient.post.count({
    where: {
      slug: post.slug,
    },
  });

  if (countPostBySlug === 1) {
    throw new ResponseError(400, "slug already exist");
  }

  return prismaClient.post.create({
    data: post,
    select: {
      id: true,
      slug: true,
      title: true,
      summary: true,
      content: true,
      comments: true,
      createdAt: true,
      author: {
        select: {
          username: true,
          name: true,
        },
      },
    },
  });
};

const get = async (postId) => {
  postId = validate(getPostValidation, postId);

  const post = await prismaClient.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      id: true,
      slug: true,
      title: true,
      summary: true,
      content: true,
      createdAt: true,
      author: {
        select: {
          username: true,
          name: true,
        },
      },
      comments: {
        select: {
          id: true,
          createdAt: true,
          message: true,
        },
      },
    },
  });

  if (!post) {
    throw new ResponseError(404, "post is not found");
  }

  return post;
};

const update = async (user, request) => {
  const post = validate(updatePostValidation, request);

  const totalPostInDatabase = await prismaClient.post.count({
    where: {
      authorId: user.id,
      id: post.id,
    },
  });

  if (totalPostInDatabase !== 1) {
    throw new ResponseError(404, "post is not found");
  }

  return prismaClient.post.update({
    where: {
      id: post.id,
    },
    data: {
      slug: post.slug,
      title: post.title,
      summary: post.summary,
      content: post.content,
    },
    select: {
      id: true,
      slug: true,
      title: true,
      summary: true,
      content: true,
      comments: true,
      createdAt: true,
      author: {
        select: {
          username: true,
          name: true,
        },
      },
    },
  });
};

const remove = async (user, postId) => {
  postId = validate(getPostValidation, postId);

  const totalPostInDatabase = await prismaClient.post.count({
    where: {
      authorId: user.id,
      id: postId,
    },
  });

  if (totalPostInDatabase !== 1) {
    throw new ResponseError(404, "post is not found");
  }

  return prismaClient.post.delete({
    where: {
      id: postId,
    },
  });
};

const search = async (request) => {
  request = validate(searchPostValidation, request);

  // 1 ((page - 1) * size) = 0
  // 2 ((page - 1) * size) = 10
  const skip = (request.page - 1) * request.size;

  const filters = [];

  if (request.slug) {
    filters.push({
      slug: {
        contains: request.slug,
      },
    });
  }

  if (request.title) {
    filters.push({
      title: {
        contains: request.title,
      },
    });
  }

  if (request.summary) {
    filters.push({
      summary: {
        contains: request.summary,
      },
    });
  }

  if (request.content) {
    filters.push({
      content: {
        contains: request.content,
      },
    });
  }

  if (request.authorId) {
    filters.push({
      authorId: {
        contains: request.authorId,
      },
    });
  }

  const posts = await prismaClient.post.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
    select: {
      id: true,
      slug: true,
      title: true,
      summary: true,
      content: true,
      comments: true,
      createdAt: true,
      author: {
        select: {
          username: true,
          name: true,
        },
      },
    },
  });

  const totalPosts = await prismaClient.post.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: posts,
    paging: {
      page: request.page,
      total_item: totalPosts,
      total_page: Math.ceil(totalPosts / request.size),
    },
  };
};

export default { create, get, update, remove, search };
