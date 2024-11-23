import { faker } from "@faker-js/faker/.";
import {
  UploadImage,
  UploadImageRepository,
} from "../../../src/application/posts/UploadImage";
import { ObjectStorage } from "../../../src/infra/bucket/ObjectStorage";
import { ApplicationException } from "../../../src/infra/exception/ApplicationException";
import fs from "fs";

jest.mock("fs");

describe("UploadImage", () => {
  let postsRepository: UploadImageRepository;
  let objectStorage: ObjectStorage;

  beforeEach(() => {
    postsRepository = {
      getPost: jest.fn(),
      updatePost: jest.fn(),
    };
    objectStorage = {
      put: jest.fn(),
    };
  });

  it("should upload an image", async () => {
    const post = {
      description: faker.lorem.sentence(),
      image: "",
      uuid: faker.string.uuid(),
    };
    const url = faker.image.url();
    const updatedPost = {
      ...post,
      image: url,
    };
    postsRepository.getPost = jest.fn().mockResolvedValue(post);
    postsRepository.updatePost = jest.fn().mockResolvedValue(updatedPost);
    objectStorage.put = jest.fn().mockResolvedValue(url);

    const service = new UploadImage();
    service.postsRepository = postsRepository;
    service.objectStorage = objectStorage;

    const originalFilename = "image.jpg";
    const filePath = faker.system.filePath();
    const result = await service.execute(post.uuid, originalFilename, filePath);

    expect(result).toEqual({ url });
    expect(postsRepository.getPost).toHaveBeenCalledTimes(1);
    expect(postsRepository.getPost).toHaveBeenCalledWith(post.uuid);
    expect(postsRepository.updatePost).toHaveBeenCalledTimes(1);
    expect(postsRepository.updatePost).toHaveBeenCalledWith(
      post.uuid,
      updatedPost
    );
    expect(objectStorage.put).toHaveBeenCalledTimes(1);
    expect(objectStorage.put).toHaveBeenCalledWith(
      "posts",
      expect.any(String),
      expect.any(String)
    );
  });

  it("should throw an error if post does not exist", async () => {
    const post = {
      description: faker.lorem.sentence(),
      image: "",
      uuid: faker.string.uuid(),
    };
    postsRepository.getPost = jest.fn().mockResolvedValue(undefined);

    const service = new UploadImage();
    service.postsRepository = postsRepository;
    service.objectStorage = objectStorage;

    await expect(
      service.execute(post.uuid, "image.jpg", "uploads/image.jpg")
    ).rejects.toThrow(new ApplicationException(404, {}, "Post not found"));
    expect(postsRepository.getPost).toHaveBeenCalledTimes(1);
    expect(postsRepository.getPost).toHaveBeenCalledWith(post.uuid);
  });
});
