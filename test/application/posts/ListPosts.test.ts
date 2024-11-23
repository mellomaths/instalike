import { faker } from "@faker-js/faker/.";
import { ListPosts } from "../../../src/application/posts/ListPosts";

describe("ListPosts", () => {
  let postsRepository;

  beforeEach(() => {
    postsRepository = {
      listPosts: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should list posts", async () => {
    const postsDatabase = [
      {
        description: faker.lorem.sentence(),
        image: faker.image.url(),
        uuid: crypto.randomUUID(),
      },
    ];
    const postsRepository = {
      listPosts: jest.fn().mockResolvedValue(postsDatabase),
    };
    const listPosts = new ListPosts();
    listPosts.postsRepository = postsRepository;
    const posts = await listPosts.execute();

    expect(posts).toEqual([
      {
        description: postsDatabase[0].description,
        image: postsDatabase[0].image,
        uuid: postsDatabase[0].uuid,
      },
    ]);
    expect(postsRepository.listPosts).toHaveBeenCalledTimes(1);
  });
});
