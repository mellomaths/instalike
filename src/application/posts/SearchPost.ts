import { Inject } from "../../infra/di/DependencyInjection";
import { Post } from "./Post";

export class SearchPost {
  @Inject("PostsRepository")
  postsRepository?: SearchPostRepository;

  constructor() {}

  async execute(keyword: string): Promise<Post[]> {
    const posts = this.postsRepository?.searchPost(keyword);
    return posts || [];
  }
}

export interface SearchPostRepository {
  searchPost(keyword: string): Promise<Post[]>;
}
