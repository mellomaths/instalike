import { Inject } from "../../infra/di/DependencyInjection";
import { Post } from "./Post";

export class CreatePost {
  @Inject("PostsRepository")
  postsRepository?: CreatePostRepository;

  async execute(post: Post): Promise<{ post_id: string }> {
    post.uuid = crypto.randomUUID();
    await this.postsRepository?.savePost(post);
    return { post_id: post.uuid };
  }
}

export interface CreatePostRepository {
  savePost(post: Post): Promise<void>;
}
