import { Post } from "../Post";
import { PostDAO } from "./PostDAO";

export class PostDAOMemory implements PostDAO {
  private posts: Post[] = [];

  async listPosts(): Promise<Post[]> {
    return this.posts;
  }

  async savePost(post: Post): Promise<void> {
    this.posts.push(post);
  }

  async getPost(uuid: string): Promise<Post | undefined> {
    const post = this.posts.find((post) => post.uuid === uuid);
    return post;
  }

  async searchPost(keyword: string): Promise<Post[]> {
    return this.posts.filter((post) => post.description.includes(keyword));
  }
}
