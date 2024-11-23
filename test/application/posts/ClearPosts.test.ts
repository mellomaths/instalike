import {
  ClearPosts,
  ClearPostsRepository,
} from "../../../src/application/posts/ClearPosts";

describe("ClearPosts", () => {
  let postsRepository: ClearPostsRepository;

  beforeEach(() => {
    postsRepository = {
      clearPosts: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should clear posts", async () => {
    const clearPosts = new ClearPosts();
    clearPosts.postsRepository = postsRepository;

    await clearPosts.execute();

    expect(postsRepository.clearPosts).toHaveBeenCalledTimes(1);
  });
});
