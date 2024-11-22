import { Inject } from "../../infra/di/DependencyInjection";
import { ApplicationException } from "../../infra/exception/ApplicationException";
import { Post } from "./Post";

export class UpdatePost {
  @Inject("PostsRepository")
  postsRepository?: UpdatePostRepository;

  async execute(uuid: string, post: Post): Promise<Post> {
    const existingPost = await this.postsRepository?.getPost(uuid);
    if (!existingPost) {
      throw new ApplicationException(404, {}, "Post not found");
    }

    if (post.uuid !== existingPost.uuid) {
      const error = "UUID cannot be updated";
      throw new ApplicationException(400, { message: error }, error);
    }

    if (post.image !== existingPost.image) {
      const error = "Image cannot be updated";
      throw new ApplicationException(400, { message: error }, error);
    }

    const updatedPost = await this.postsRepository?.updatePost(uuid, post);
    return updatedPost!;
  }
}

export interface UpdatePostRepository {
  updatePost(uuid: string, post: Post): Promise<Post>;
  getPost(uuid: string): Promise<Post | undefined>;
}
