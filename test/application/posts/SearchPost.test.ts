import { faker } from "@faker-js/faker/.";
import {
  SearchPost,
  SearchPostRepository,
} from "../../../src/application/posts/SearchPost";

describe("SearchPost", () => {
  let postsRepository: SearchPostRepository;

  beforeEach(() => {
    postsRepository = {
      searchPost: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should search posts by keyword", async () => {
    const postsDatabase = [
      {
        description: faker.lorem.sentence(),
        image: faker.image.url(),
        uuid: crypto.randomUUID(),
      },
    ];
    postsRepository.searchPost = jest.fn().mockResolvedValue(postsDatabase);

    const service = new SearchPost();
    service.postsRepository = postsRepository;
    const posts = await service.execute("keyword");
    expect(posts).toEqual([
      {
        description: postsDatabase[0].description,
        image: postsDatabase[0].image,
        uuid: postsDatabase[0].uuid,
      },
    ]);
  });
});
