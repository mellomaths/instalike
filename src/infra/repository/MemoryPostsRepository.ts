import { Post } from "../../application/posts/Post";
import { Inject } from "../di/DependencyInjection";
import { Logger } from "../logger/Logger";
import { PostsRepository } from "./PostsRepository";

export class MemoryPostsRepository implements PostsRepository {
  @Inject("Logger")
  logger?: Logger;

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
    keyword = keyword.toLowerCase();
    return this.posts.filter((post) =>
      post.description.toLowerCase().includes(keyword)
    );
  }

  async deletePost(uuid: string): Promise<void> {
    this.posts = this.posts.filter((post) => post.uuid !== uuid);
  }

  async clearPosts(): Promise<void> {
    this.logger?.debug("Clearing posts");
    this.posts = [];
  }

  async updatePost(uuid: string, post: Post): Promise<Post> {
    const index = this.posts.findIndex((p) => p.uuid === uuid);
    if (index === -1) {
      throw new Error("Post not found.");
    }
    this.posts[index] = post;
    return post;
  }
}
