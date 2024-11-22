import fs from "fs";
import { ObjectStorage } from "../../infra/bucket/ObjectStorage";
import { Inject } from "../../infra/di/DependencyInjection";
import { ApplicationException } from "../../infra/exception/ApplicationException";
import { PostsRepository } from "../../infra/repository/PostsRepository";
import { Settings } from "../../infra/settings/Settings";
import { Post } from "./Post";

export class UploadImage {
  @Inject("ObjectStorage")
  objectStorage?: ObjectStorage;

  @Inject("PostsRepository")
  postsRepository?: PostsRepository;

  @Inject("Settings")
  settings?: Settings;

  async execute(
    post_id: string,
    originalFilename: string,
    filePath: string
  ): Promise<{ url: string }> {
    const post = await this.postsRepository?.getPost(post_id);
    if (!post) {
      throw new ApplicationException(404, {}, "Post not found");
    }

    const bucket = "posts";
    const extension = originalFilename.split(".").pop();
    const imageId = crypto.randomUUID();
    const newFilename = `${imageId}.${extension}`;
    const newFilePath = `uploads/${newFilename}`;
    fs.renameSync(filePath, newFilePath);
    const key = `${post_id}/${newFilename}`;
    const url = await this.objectStorage?.put(bucket, key, newFilePath);
    this.postsRepository?.updatePost({ ...post, image: url! });
    fs.unlinkSync(newFilePath);
    return { url: url! };
  }
}

export interface UploadImageRepository {
  getPost(uuid: string): Promise<Post | undefined>;
  updatePost(post: Post): Promise<void>;
}
