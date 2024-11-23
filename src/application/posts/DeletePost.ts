import { Inject } from "../../infra/di/DependencyInjection";
import { Post } from "./Post";

export class DeletePost {
  @Inject("PostsRepository")
  postsRepository?: DeletePostRepository;

  async execute(uuid: string): Promise<boolean> {
    const post = await this.postsRepository?.getPost(uuid);
    if (!post) {
      return true;
    }

    await this.postsRepository?.deletePost(uuid);
    return true;
  }
}

export interface DeletePostRepository {
  getPost(uuid: string): Promise<Post | undefined>;
  deletePost(uuid: string): Promise<void>;
}
