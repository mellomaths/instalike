import axios from "axios";
import { faker } from "@faker-js/faker";
import { Post } from "../src/posts/Post";

axios.defaults.validateStatus = function () {
  return true;
};

describe("PostController", () => {
  let random_post: Post;
  let random_post_id: string;

  beforeEach(() => {
    random_post = {
      description: faker.lorem.sentence(),
      image: faker.image.urlPicsumPhotos(),
    };
  });

  afterEach(() => {
    axios.delete(`http://localhost:3000/posts/${random_post_id}`);
  });

  describe("GET /posts", () => {
    it("should return a 200 status and data", async () => {
      let response = await axios.post(
        "http://localhost:3000/posts",
        random_post
      );
      expect(response.status).toBe(201);
      expect(response.data.post_id).toBeDefined();
      random_post_id = response.data.post_id;

      response = await axios.get("http://localhost:3000/posts");
      expect(response.status).toBe(200);
      expect(response.data[0].uuid).toBeDefined();
      expect(response.data[0].description).toBe(random_post.description);
      expect(response.data[0].image).toBe(random_post.image);
    });
  });

  describe("GET /posts/:id", () => {
    it("should return a 200 status and data", async () => {
      let response = await axios.post(
        "http://localhost:3000/posts",
        random_post
      );
      expect(response.status).toBe(201);
      expect(response.data.post_id).toBeDefined();
      random_post_id = response.data.post_id;

      response = await axios.get("http://localhost:3000/posts");
      expect(response.status).toBe(200);

      const id = response.data[0].uuid;
      response = await axios.get(`http://localhost:3000/posts/${id}`);
      expect(response.status).toBe(200);
      expect(response.data.uuid).toBe(id);
      expect(response.data.description).toBeDefined();
      expect(response.data.image).toBeDefined();
    });

    it("should return a 404 status", async () => {
      const id = "invalid-id";
      const response = await axios.get(`http://localhost:3000/posts/${id}`);
      expect(response.status).toBe(404);
    });
  });

  describe("POST /posts", () => {
    it("should return a 201 status", async () => {
      const response = await axios.post(
        "http://localhost:3000/posts",
        random_post
      );
      expect(response.status).toBe(201);
      expect(response.data.post_id).toBeDefined();
      random_post_id = response.data.post_id;
    });
  });

  describe("GET /posts/search/:keyword", () => {
    it("should return a 200 status and data", async () => {
      const post = {
        description: "This is the first post",
        image: "https://picsum.photos/200/300",
      };
      let response = await axios.post("http://localhost:3000/posts", post);
      expect(response.status).toBe(201);
      expect(response.data.post_id).toBeDefined();
      random_post_id = response.data.post_id;

      response = await axios.get("http://localhost:3000/posts");
      expect(response.status).toBe(200);

      const keyword = "first";
      response = await axios.get(
        `http://localhost:3000/posts/search/${keyword}`
      );
      expect(response.status).toBe(200);
      expect(response.data[0].uuid).toBeDefined();
      expect(response.data[0].description).toBe(post.description);
      expect(response.data[0].image).toBe(post.image);
    });
  });
});
