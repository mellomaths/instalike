import { Post } from "../../application/posts/Post";
import { DatabaseConnection } from "../database/DatabaseConnection";
import { Inject } from "../di/DependencyInjection";
import { PostsRepository } from "./PostsRepository";

export class MongoPostsRepository implements PostsRepository {
  @Inject("Database")
  database?: DatabaseConnection;

  constructor() {
    this.database?.connect();
  }

  async listPosts(): Promise<Post[]> {
    const posts = this.database?.getConnection().collection("posts");
    const result = await posts.find().toArray();
    return result.map((post: any) => ({
      uuid: post.uuid,
      description: post.description,
      image: post.image,
    }));
  }
  async savePost(post: Post): Promise<void> {
    const posts = this.database?.getConnection().collection("posts");
    await posts.insertOne(post);
  }
  async getPost(uuid: string): Promise<Post | undefined> {
    const posts = this.database?.getConnection().collection("posts");
    const result = await posts.findOne({ uuid });
    if (!result) {
      return undefined;
    }

    return {
      uuid: result.uuid,
      description: result.description,
      image: result.image,
    };
  }
  async searchPost(keyword: string): Promise<Post[]> {
    const posts = this.database?.getConnection().collection("posts");
    const result = await posts
      .find({
        description: { $regex: keyword, $options: "i" },
      })
      .toArray();
    return result.map((post: any) => ({
      uuid: post.uuid,
      description: post.description,
      image: post.image,
    }));
  }
  async deletePost(uuid: string): Promise<void> {
    const posts = this.database?.getConnection().collection("posts");
    await posts.deleteOne({ uuid });
  }
  async clearPosts(): Promise<void> {
    const posts = this.database?.getConnection().collection("posts");
    await posts.deleteMany({});
  }

  async updatePost(post: Post): Promise<void> {
    const posts = this.database?.getConnection().collection("posts");
    await posts.updateOne({ uuid: post.uuid }, { $set: post });
  }
}
