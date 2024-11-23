import { Inject } from "../../infra/di/DependencyInjection";
import { Post } from "./Post";

export class ListPosts {
  @Inject("PostsRepository")
  postsRepository?: ListPostsRepository;

  async execute(): Promise<Post[]> {
    const posts = this.postsRepository?.listPosts();
    return posts || [];
  }
}

export interface ListPostsRepository {
  listPosts(): Promise<Post[]>;
}
