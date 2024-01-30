import supertest from "supertest";
import {
  createTestComment,
  createTestPost,
  createTestUser,
  getTestComment,
  getTestPost,
  getTestUser,
  removeTestUser,
} from "./test-util";
import { web } from "../src/application/web";

describe("POST /api/posts/:postId/comments", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestPost();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can create a new comment", async () => {
    const testUser = await getTestUser();
    const testPost = await getTestPost();

    const payload = {
      username: testUser.username,
      message: "test comment",
    };

    const result = await supertest(web)
      .post(`/api/posts/${testPost.id}/comments`)
      .set("Authorization", "test")
      .send(payload);

    expect(result.status).toBe(200);
    expect(result.body.data.message).toBe(payload.message);
    expect(result.body.data.post.id).toBe(testPost.id);
    expect(result.body.data.post.slug).toBe(testPost.slug);
    expect(result.body.data.post.title).toBe(testPost.title);
  });

  it("should reject if request is invalid", async () => {
    const testUser = await getTestUser();
    const testPost = await getTestPost();

    // message is missing
    const payload = {
      username: testUser.username,
    };

    const result = await supertest(web)
      .post(`/api/posts/${testPost.id}/comments`)
      .set("Authorization", "test")
      .send(payload);

    expect(result.status).toBe(400);
  });

  it("should reject if post is not found", async () => {
    const testUser = await getTestUser();
    const testPost = await getTestPost();

    const payload = {
      username: testUser.username,
      message: "test comment",
    };

    const result = await supertest(web)
      .post(`/api/posts/${testPost.id}-unknown/comments`)
      .set("Authorization", "test")
      .send(payload);

    expect(result.status).toBe(404);
    expect(result.body.errors).toBe("post is not found");
  });

  it("should reject if user is not logged in", async () => {
    const testUser = await getTestUser();
    const testPost = await getTestPost();

    const payload = {
      username: testUser.username,
      message: "test comment",
    };

    const result = await supertest(web)
      .post(`/api/posts/${testPost.id}/comments`)
      .send(payload);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBe("Unauthorized");
  });
});

describe("GET /api/posts/:postId/comments/:commentId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestPost();
    await createTestComment();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can get comment", async () => {
    const testUser = await getTestUser();
    const testPost = await getTestPost();
    const testComment = await getTestComment();

    const result = await supertest(web).get(
      `/api/posts/${testPost.id}/comments/${testComment.id}`
    );

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testComment.id);
    expect(result.body.data.message).toBe(testComment.message);
    expect(result.body.data.post.id).toBe(testPost.id);
    expect(result.body.data.user.username).toBe(testUser.username);
  });

  it("should return 404 if comment id is not found", async () => {
    const testPost = await getTestPost();
    const testComment = await getTestComment();

    const result = await supertest(web).get(
      `/api/posts/${testPost.id}/comments/${testComment.id}-unknown`
    );

    expect(result.status).toBe(404);
    expect(result.body.errors).toBe("comment is not found");
  });

  it("should return 404 if post id is not found", async () => {
    const testPost = await getTestPost();
    const testComment = await getTestComment();

    const result = await supertest(web).get(
      `/api/posts/${testPost.id}-unknown/comments/${testComment.id}`
    );

    expect(result.status).toBe(404);
    expect(result.body.errors).toBe("post is not found");
  });
});

describe("POST /api/posts/:postId/comments/:commentId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestPost();
    await createTestComment();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can update comment", async () => {
    const testUser = await getTestUser();
    const testPost = await getTestPost();
    const testComment = await getTestComment();

    const payload = {
      message: "test message edit",
    };

    const result = await supertest(web)
      .put(`/api/posts/${testPost.id}/comments/${testComment.id}`)
      .set("Authorization", "test")
      .send(payload);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testComment.id);
    expect(result.body.data.message).toBe(payload.message);
    expect(result.body.data.user.username).toBe(testUser.username);
  });

  it("should reject if comment is not found", async () => {
    const testPost = await getTestPost();
    const testComment = await getTestComment();

    const payload = {
      message: "test message edit",
    };

    const result = await supertest(web)
      .put(`/api/posts/${testPost.id}/comments/${testComment.id}-unknown`)
      .set("Authorization", "test")
      .send(payload);

    expect(result.status).toBe(404);
    expect(result.body.errors).toBe("comment is not found");
  });

  it("should reject if post is not found", async () => {
    const testPost = await getTestPost();
    const testComment = await getTestComment();

    const payload = {
      message: "test message edit",
    };

    const result = await supertest(web)
      .put(`/api/posts/${testPost.id}-unknown/comments/${testComment.id}`)
      .set("Authorization", "test")
      .send(payload);

    expect(result.status).toBe(404);
    expect(result.body.errors).toBe("post is not found");
  });

  it("should reject if user is not logged in", async () => {
    const testPost = await getTestPost();
    const testComment = await getTestComment();

    const payload = {
      message: "test message edit",
    };

    const result = await supertest(web)
      .put(`/api/posts/${testPost.id}/comments/${testComment.id}`)
      .send(payload);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBe("Unauthorized");
  });
});

describe("DELETE /api/posts/:postId/comments/:commentId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestPost();
    await createTestComment();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can remove a comment", async () => {
    const testPost = await getTestPost();
    let testComment = await getTestComment();

    const result = await supertest(web)
      .delete(`/api/posts/${testPost.id}/comments/${testComment.id}`)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    testComment = await getTestComment();
    expect(testComment).toBeNull();
  });

  it("should reject if comment is not found", async () => {
    const testPost = await getTestPost();
    let testComment = await getTestComment();

    const result = await supertest(web)
      .delete(`/api/posts/${testPost.id}/comments/${testComment.id}-unknown`)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
    expect(result.body.errors).toBe("comment is not found");
  });

  it("should reject if post is not found", async () => {
    const testPost = await getTestPost();
    let testComment = await getTestComment();

    const result = await supertest(web)
      .delete(`/api/posts/${testPost.id}-unknown/comments/${testComment.id}`)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
    expect(result.body.errors).toBe("post is not found");
  });

  it("should reject user is not logged in", async () => {
    const testPost = await getTestPost();
    const testComment = await getTestComment();

    const result = await supertest(web).delete(
      `/api/posts/${testPost.id}/comments/${testComment.id}`
    );

    expect(result.status).toBe(401);
    expect(result.body.errors).toBe("Unauthorized");
  });
});

describe("GET /api/posts/:postId/comments", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestPost();
    await createTestComment();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can list comments", async () => {
    const testPost = await getTestPost();

    const result = await supertest(web).get(
      `/api/posts/${testPost.id}/comments`
    );

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(1);
  });

  it("should reject if post is not found", async () => {
    const testPost = await getTestPost();

    const result = await supertest(web).get(
      `/api/posts/${testPost.id}-unknown/comments`
    );

    expect(result.status).toBe(404);
    expect(result.body.errors).toBe("post is not found");
  });
});