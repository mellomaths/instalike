import { faker } from "@faker-js/faker/.";
import {
  CreatePost,
  CreatePostRepository,
} from "../../../src/application/posts/CreatePost";
import { Post } from "../../../src/application/posts/Post";

describe("CreatePost", () => {
  let postsRepository: CreatePostRepository;

  beforeEach(() => {
    postsRepository = {
      savePost: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a post", async () => {
    const createPost = new CreatePost();
    createPost.postsRepository = postsRepository;

    const post: Post = {
      description: faker.lorem.sentence(),
      image: faker.image.url(),
    };

    await createPost.execute(post);

    expect(postsRepository.savePost).toHaveBeenCalledTimes(1);
    expect(postsRepository.savePost).toHaveBeenCalledWith({
      description: post.description,
      image: post.image,
      uuid: expect.any(String),
    });
  });
});
