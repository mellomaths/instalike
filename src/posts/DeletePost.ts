import { Post } from "./Post";

export class DeletePost {
  constructor(private data: DeletePostData) {}

  async execute(uuid: string): Promise<boolean> {
    const post = await this.data.getPost(uuid);
    if (!post) {
      return true;
    }

    await this.data.deletePost(uuid);
    return true;
  }
}

export interface DeletePostData {
  getPost(uuid: string): Promise<Post | undefined>;
  deletePost(uuid: string): Promise<void>;
}
