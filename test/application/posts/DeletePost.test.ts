import {
  DeletePost,
  DeletePostRepository,
} from "../../../src/application/posts/DeletePost";

describe("DeletePost", () => {
  let postsRepository: DeletePostRepository;

  beforeEach(() => {
    postsRepository = {
      getPost: jest.fn(),
      deletePost: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete a post", async () => {
    postsRepository.getPost = jest.fn().mockResolvedValue({
      uuid: crypto.randomUUID(),
      description: "description",
      image: "image",
    });
    postsRepository.deletePost = jest.fn().mockResolvedValue(true);

    const deletePost = new DeletePost();
    deletePost.postsRepository = postsRepository;

    await deletePost.execute("uuid");

    expect(postsRepository.getPost).toHaveBeenCalledTimes(1);
    expect(postsRepository.getPost).toHaveBeenCalledWith("uuid");
    expect(postsRepository.deletePost).toHaveBeenCalledTimes(1);
    expect(postsRepository.deletePost).toHaveBeenCalledWith("uuid");
  });

  it("should return true if post does not exist", async () => {
    postsRepository.getPost = jest.fn().mockResolvedValue(undefined);

    const deletePost = new DeletePost();
    deletePost.postsRepository = postsRepository;

    const result = await deletePost.execute("uuid");

    expect(result).toBe(true);
    expect(postsRepository.getPost).toHaveBeenCalledTimes(1);
    expect(postsRepository.getPost).toHaveBeenCalledWith("uuid");
    expect(postsRepository.deletePost).not.toHaveBeenCalled();
  });
});
