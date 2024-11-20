import { Post } from "./Post";

export class CreatePost {
  constructor(private readonly data: CreatePostData) {}

  async execute(post: Post): Promise<string> {
    post.uuid = crypto.randomUUID();
    await this.data.savePost(post);
    return post.uuid;
  }
}

export interface CreatePostData {
  savePost(post: Post): Promise<void>;
}
