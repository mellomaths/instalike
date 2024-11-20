import { Post } from "./Post";

export class GetPost {
  constructor(private readonly data: GetPostData) {}

  async execute(uuid: string): Promise<Post> {
    const post = await this.data.getPost(uuid);
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  }
}

export interface GetPostData {
  getPost(uuid: string): Promise<Post | undefined>;
}
