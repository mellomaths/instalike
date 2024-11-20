import { Post } from "./Post";

export class CreatePost {
  constructor(private readonly data: CreatePostData) {}

  async execute(post: Post): Promise<void> {
    post.uuid = crypto.randomUUID();
    return this.data.savePost(post);
  }
}

export interface CreatePostData {
  savePost(post: Post): Promise<void>;
}
