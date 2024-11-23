import { faker } from "@faker-js/faker/.";
import {
  UpdatePost,
  UpdatePostRepository,
} from "../../../src/application/posts/UpdatePost";
import { ApplicationException } from "../../../src/infra/exception/ApplicationException";

describe("UpdatePost", () => {
  let postsRepository: UpdatePostRepository;

  beforeEach(() => {
    postsRepository = {
      getPost: jest.fn(),
      updatePost: jest.fn(),
    };
  });

  it("should update a post", async () => {
    const post = {
      description: faker.lorem.sentence(),
      image: faker.image.url(),
      uuid: faker.string.uuid(),
    };
    const updatedPost = {
      ...post,
      description: faker.lorem.sentence(),
    };
    postsRepository.getPost = jest.fn().mockResolvedValue(post);
    postsRepository.updatePost = jest.fn().mockResolvedValue(updatedPost);

    const service = new UpdatePost();
    service.postsRepository = postsRepository;
    const result = await service.execute(post.uuid, updatedPost);

    expect(result).toEqual(updatedPost);
    expect(postsRepository.getPost).toHaveBeenCalledTimes(1);
    expect(postsRepository.getPost).toHaveBeenCalledWith(post.uuid);
    expect(postsRepository.updatePost).toHaveBeenCalledTimes(1);
    expect(postsRepository.updatePost).toHaveBeenCalledWith(
      post.uuid,
      updatedPost
    );
  });

  it("should throw an error if post does not exist", async () => {
    const post = {
      description: faker.lorem.sentence(),
      image: faker.image.url(),
      uuid: faker.string.uuid(),
    };
    postsRepository.getPost = jest.fn().mockResolvedValue(undefined);

    const service = new UpdatePost();
    service.postsRepository = postsRepository;

    await expect(service.execute(post.uuid, post)).rejects.toThrow(
      new ApplicationException(404, {}, "Post not found")
    );
  });

  it("should throw an error if UUID is updated", async () => {
    const post = {
      description: faker.lorem.sentence(),
      image: faker.image.url(),
      uuid: faker.string.uuid(),
    };
    const updatedPost = {
      ...post,
      uuid: faker.string.uuid(),
    };
    postsRepository.getPost = jest.fn().mockResolvedValue(post);

    const service = new UpdatePost();
    service.postsRepository = postsRepository;

    await expect(service.execute(post.uuid, updatedPost)).rejects.toThrow(
      new ApplicationException(
        400,
        { message: "UUID cannot be updated" },
        "UUID cannot be updated"
      )
    );
  });

  it("should throw an error if image is updated", async () => {
    const post = {
      description: faker.lorem.sentence(),
      image: faker.image.url(),
      uuid: faker.string.uuid(),
    };
    const updatedPost = {
      ...post,
      image: faker.image.url(),
    };
    postsRepository.getPost = jest.fn().mockResolvedValue(post);

    const service = new UpdatePost();
    service.postsRepository = postsRepository;

    await expect(service.execute(post.uuid, updatedPost)).rejects.toThrow(
      new ApplicationException(
        400,
        { message: "Image cannot be updated" },
        "Image cannot be updated"
      )
    );
  });
});
