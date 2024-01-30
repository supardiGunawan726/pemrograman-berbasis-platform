import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("rahasia", 10),
      name: "test",
      token: "test",
    },
  });
};

export const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: "test",
    },
  });
};

export const createTestPost = async () => {
  return prismaClient.post.create({
    data: {
      id: "test",
      slug: "test",
      title: "test",
      summary: "test",
      content: "test",
      authorId: "test",
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
};

export const getTestPost = async () => {
  return prismaClient.post.findUnique({
    where: {
      slug: "test",
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
};

export const createManyTestPosts = async () => {
  for (let i = 0; i < 15; i++) {
    await prismaClient.post.create({
      data: {
        slug: `test-${i}`,
        title: `Test ${i}`,
        summary: `test ${i}`,
        content: `test ${i}`,
        authorId: "test",
      },
    });
  }
};

export const createTestComment = async () => {
  return prismaClient.comment.create({
    data: {
      id: "test",
      message: "test",
      postId: "test",
      username: "test",
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
    },
  });
};

export const getTestComment = async () => {
  return prismaClient.comment.findFirst({
    where: {
      id: "test",
      postId: "test",
    },
    select: {
      id: true,
      message: true,
      user: {
        select: {
          username: true,
          name: true,
        },
      },
      post: {
        select: {
          id: true,
          slug: true,
          title: true,
        },
      },
    },
  });
};
