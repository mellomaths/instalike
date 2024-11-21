import { Inject } from "../../infra/di/DependencyInjection";
import { ApplicationException } from "../../infra/exception/ApplicationException";
import { Post } from "./Post";

export class GetPost {
  @Inject("PostsRepository")
  postsRepository?: GetPostRepository;

  constructor() {}

  async execute(uuid: string): Promise<Post> {
    const post = await this.postsRepository?.getPost(uuid);
    if (!post) {
      throw new ApplicationException(404, {}, "Post not found");
    }
    return post;
  }
}

export interface GetPostRepository {
  getPost(uuid: string): Promise<Post | undefined>;
}
