import { Inject } from "../../infra/di/DependencyInjection";

export class ClearPosts {
  @Inject("PostsRepository")
  postsRepository?: ClearPostsRepository;

  constructor() {}

  async execute(): Promise<void> {
    await this.postsRepository?.clearPosts();
  }
}

export interface ClearPostsRepository {
  clearPosts(): Promise<void>;
}
