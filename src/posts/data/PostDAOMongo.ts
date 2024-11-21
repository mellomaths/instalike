import { Collection, Document, ObjectId } from "mongodb";
import { MongoConfig } from "../../infra/database/mongo";
import { Post } from "../Post";
import { PostDAO } from "./PostDAO";

export class PostDAOMongo implements PostDAO {
  constructor(private readonly config: MongoConfig) {
    this.config.connect();
  }
  async listPosts(): Promise<Post[]> {
    const posts = this.config.getCollection("posts");
    const result = await posts.find().toArray();
    return result.map((post) => ({
      uuid: post.uuid,
      description: post.description,
      image: post.image,
    }));
  }
  async savePost(post: Post): Promise<void> {
    const posts = this.config.getCollection("posts");
    await posts.insertOne(post);
  }
  async getPost(uuid: string): Promise<Post | undefined> {
    const posts = this.config.getCollection("posts");
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
    const posts = this.config.getCollection("posts");
    const result = await posts
      .find({
        description: { $regex: keyword, $options: "i" },
      })
      .toArray();
    return result.map((post) => ({
      uuid: post.uuid,
      description: post.description,
      image: post.image,
    }));
  }
  async deletePost(uuid: string): Promise<void> {
    const posts = this.config.getCollection("posts");
    await posts.deleteOne({ uuid });
  }
  async clearPosts(): Promise<void> {
    const posts = this.config.getCollection("posts");
    await posts.deleteMany({});
  }
}
