import fs from "fs";
import axios from "axios";
import FormData from "form-data";
import { faker } from "@faker-js/faker";
import { Post } from "../../src/application/posts/Post";

axios.defaults.validateStatus = function () {
  return true;
};

describe("PostController", () => {
  let random_post: Post;
  let random_post_id: string;

  beforeEach(() => {
    axios.delete(`http://localhost:3000/posts`);
    random_post = {
      description: faker.lorem.sentence(),
      image: faker.image.urlPicsumPhotos(),
    };
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
      const id = crypto.randomUUID();
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

  describe("DELETE /posts/:id", () => {
    it("should return a 204 status", async () => {
      let response = await axios.post(
        "http://localhost:3000/posts",
        random_post
      );
      expect(response.status).toBe(201);
      expect(response.data.post_id).toBeDefined();
      random_post_id = response.data.post_id;

      response = await axios.delete(
        `http://localhost:3000/posts/${random_post_id}`
      );
      expect(response.status).toBe(204);

      response = await axios.get("http://localhost:3000/posts");
      expect(response.status).toBe(200);
      expect(response.data.length).toBe(0);
    });
  });

  describe("DELETE /posts", () => {
    it("should return a 204 status", async () => {
      let response = await axios.post(
        "http://localhost:3000/posts",
        random_post
      );
      expect(response.status).toBe(201);
      expect(response.data.post_id).toBeDefined();
      random_post_id = response.data.post_id;

      response = await axios.delete(`http://localhost:3000/posts`);
      expect(response.status).toBe(204);

      response = await axios.get("http://localhost:3000/posts");
      expect(response.status).toBe(200);
      expect(response.data.length).toBe(0);
    });
  });

  describe("POST /posts/:id/image/upload", () => {
    it("should return a 201 status and data", async () => {
      let response = await axios.post(
        "http://localhost:3000/posts",
        random_post
      );
      expect(response.status).toBe(201);
      expect(response.data.post_id).toBeDefined();
      random_post_id = response.data.post_id;

      const filePath = `${__dirname}/assets/upload_image_test.jpg`;
      const formData = new FormData();
      const file = fs.createReadStream(filePath);
      formData.append("file", file);
      response = await axios.post(
        `http://localhost:3000/posts/${random_post_id}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": `multipart/form-data`,
          },
        }
      );
      expect(response.status).toBe(201);
      expect(response.data.url).toBeDefined();
      const url = response.data.url;
      response = await axios.get(
        `http://localhost:3000/posts/${random_post_id}`
      );
      expect(response.status).toBe(200);
      expect(response.data.image).toBe(url);
    });
  });

  describe("PUT /posts/:id", () => {
    it("should return a 200 status and data", async () => {
      let response = await axios.post(
        "http://localhost:3000/posts",
        random_post
      );
      expect(response.status).toBe(201);
      expect(response.data.post_id).toBeDefined();
      random_post_id = response.data.post_id;

      const update_post = random_post;
      update_post.uuid = random_post_id;
      update_post.description = faker.lorem.sentence();
      response = await axios.put(
        `http://localhost:3000/posts/${random_post_id}`,
        update_post
      );
      expect(response.status).toBe(200);
      expect(response.data.uuid).toBe(random_post_id);
      expect(response.data.description).toBe(update_post.description);
      expect(response.data.image).toBe(random_post.image);
    });
  });
});
