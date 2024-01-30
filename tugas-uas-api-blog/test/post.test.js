import supertest from "supertest";
import {
  createManyTestPosts,
  createTestPost,
  createTestUser,
  getTestPost,
  removeTestUser,
} from "./test-util";
import { web } from "../src/application/web";

describe("POST /api/posts", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should create a post", async () => {
    const requestPayload = {
      slug: "test",
      title: "test",
      summary: "test",
      content: "test",
    };

    const result = await supertest(web)
      .post("/api/posts")
      .set("Authorization", "test")
      .send(requestPayload);

    expect(result.status).toBe(200);
    expect(result.body.data.slug).toBe(requestPayload.slug);
    expect(result.body.data.title).toBe(requestPayload.title);
    expect(result.body.data.summary).toBe(requestPayload.summary);
    expect(result.body.data.content).toBe(requestPayload.content);
    expect(result.body.data.createdAt).toBeDefined();
    expect(result.body.data.author.username).toBe("test");
    expect(result.body.data.author.name).toBe("test");
    expect(result.body.data.comments).toBeDefined();
  });

  it("should reject if request is invalid", async () => {
    // content is missing
    const requestPayload = {
      slug: "test",
      title: "test",
      summary: "test",
    };

    const result = await supertest(web)
      .post("/api/posts")
      .set("Authorization", "test")
      .send(requestPayload);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject if user token is missing or user not logged in", async () => {
    const requestPayload = {
      slug: "test",
      title: "test",
      summary: "test",
      content: "test",
    };

    const result = await supertest(web).post("/api/posts").send(requestPayload);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBe("Unauthorized");
  });

  it("should reject if slug is already registered to a post", async () => {
    const requestPayload = {
      slug: "slug",
      title: "test",
      summary: "test",
      content: "test",
    };

    let result = await supertest(web)
      .post("/api/posts")
      .set("Authorization", "test")
      .send(requestPayload);

    expect(result.status).toBe(200);
    expect(result.body.data.slug).toBe(requestPayload.slug);

    result = await supertest(web)
      .post("/api/posts")
      .set("Authorization", "test")
      .send(requestPayload);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBe("slug already exist");
  });
});

describe("GET /api/posts/:postId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestPost();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can get post", async () => {
    const testPost = await getTestPost();

    const result = await supertest(web)
      .get("/api/posts/" + testPost.id)
      .send();

    expect(result.status).toBe(200);
  });

  it("should return 404 if post id is not found", async () => {
    const testPost = await getTestPost();

    const result = await supertest(web).get(
      "/api/posts/" + (testPost.id + "-unknown")
    );

    expect(result.status).toBe(404);
    expect(result.body.errors).toBe("post is not found");
  });
});

describe("PUT /api/posts/:postId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestPost();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can update existing post", async () => {
    const testPost = await getTestPost();

    const requestPayload = {
      slug: "test-edited",
      title: "Test Edited",
      summary: "test edited",
      content: "test edited",
    };

    const result = await supertest(web)
      .put("/api/posts/" + testPost.id)
      .set("Authorization", "test")
      .send(requestPayload);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testPost.id);
    expect(result.body.data.slug).toBe(requestPayload.slug);
    expect(result.body.data.title).toBe(requestPayload.title);
    expect(result.body.data.summary).toBe(requestPayload.summary);
    expect(result.body.data.content).toBe(requestPayload.content);
  });

  it("should reject if request is invalid", async () => {
    const testPost = await getTestPost();

    // ? is not allowed in slug
    const requestPayload = {
      slug: "test-edited?",
      title: "Test Edited",
      summary: "test edited",
      content: "test edited",
    };

    const result = await supertest(web)
      .put("/api/posts/" + testPost.id)
      .set("Authorization", "test")
      .send(requestPayload);

    expect(result.status).toBe(400);
  });

  it("should reject if post id is not found", async () => {
    const testPost = await getTestPost();

    const requestPayload = {
      slug: "test-edited",
      title: "Test Edited",
      summary: "test edited",
      content: "test edited",
    };

    const result = await supertest(web)
      .put("/api/posts/" + testPost.id + "-unknown")
      .set("Authorization", "test")
      .send(requestPayload);

    expect(result.status).toBe(404);
    expect(result.body.errors).toBe("post is not found");
  });

  it("should reject if user not logged in", async () => {
    const testPost = await getTestPost();

    const requestPayload = {
      slug: "test-edited",
      title: "Test Edited",
      summary: "test edited",
      content: "test edited",
    };

    const result = await supertest(web)
      .put("/api/posts/" + testPost.id)
      .send(requestPayload);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBe("Unauthorized");
  });
});

describe("DELETE /api/posts/:postId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestPost();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can delete a post", async () => {
    let testPost = await getTestPost();

    const result = await supertest(web)
      .delete("/api/posts/" + testPost.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    testPost = await getTestPost();
    expect(testPost).toBeNull();
  });

  it("should reject if post is not found", async () => {
    const testPost = await getTestPost();

    const result = await supertest(web)
      .delete("/api/posts/" + testPost.id + "-unknown")
      .set("Authorization", "test");

    expect(result.status).toBe(404);
    expect(result.body.errors).toBe("post is not found");
  });

  it("should reject if user is not logged in", async () => {
    const testPost = await getTestPost();

    const result = await supertest(web).delete("/api/posts/" + testPost.id);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBe("Unauthorized");
  });
});

describe("GET /api/posts", function () {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestPosts();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can search test post", async () => {
    const result = await supertest(web).get("/api/posts").query({
      authorId: "test",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
  });

  it("should can search test post to page 2", async () => {
    const result = await supertest(web).get("/api/posts").query({
      authorId: "test",
      page: 2,
    });

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(5);
    expect(result.body.paging.page).toBe(2);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it("should can search test post using slug", async () => {
    const result = await supertest(web).get("/api/posts").query({
      authorId: "test",
      slug: "test-1",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it("should can search test post using title", async () => {
    const result = await supertest(web).get("/api/posts").query({
      authorId: "test",
      title: "Test 1",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it("should can search test post using summary", async () => {
    const result = await supertest(web).get("/api/posts").query({
      authorId: "test",
      summary: "test 1",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it("should can search test post using content", async () => {
    const result = await supertest(web).get("/api/posts").query({
      authorId: "test",
      content: "test 1",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });
});
