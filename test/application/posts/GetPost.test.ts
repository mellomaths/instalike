import {
  GetPost,
  GetPostRepository,
} from "../../../src/application/posts/GetPost";
import { ApplicationException } from "../../../src/infra/exception/ApplicationException";

describe("GetPost", () => {
  let postsRepository: GetPostRepository;

  beforeEach(() => {
    postsRepository = {
      getPost: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get a post", async () => {
    postsRepository.getPost = jest.fn().mockResolvedValue({
      uuid: crypto.randomUUID(),
      description: "description",
      image: "image",
    });

    const getPost = new GetPost();
    getPost.postsRepository = postsRepository;

    const post = await getPost.execute("uuid");

    expect(post).toEqual({
      uuid: expect.any(String),
      description: "description",
      image: "image",
    });
    expect(postsRepository.getPost).toHaveBeenCalledTimes(1);
    expect(postsRepository.getPost).toHaveBeenCalledWith("uuid");
  });

  it("should throw an exception if post does not exist", async () => {
    postsRepository.getPost = jest.fn().mockResolvedValue(undefined);

    const getPost = new GetPost();
    getPost.postsRepository = postsRepository;

    await expect(getPost.execute("uuid")).rejects.toThrow(
      new ApplicationException(404, {}, "Post not found")
    );

    expect(postsRepository.getPost).toHaveBeenCalledTimes(1);
    expect(postsRepository.getPost).toHaveBeenCalledWith("uuid");
  });
});
