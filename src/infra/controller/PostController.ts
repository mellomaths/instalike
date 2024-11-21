import { ClearPosts } from "../../application/posts/ClearPosts";
import { CreatePost } from "../../application/posts/CreatePost";
import { DeletePost } from "../../application/posts/DeletePost";
import { GetPost } from "../../application/posts/GetPost";
import { ListPosts } from "../../application/posts/ListPosts";
import { SearchPost } from "../../application/posts/SearchPost";
import { Inject } from "../di/DependencyInjection";
import { HttpServer } from "../http/HttpServer";

export class PostController {
  @Inject("HttpServer")
  httpServer?: HttpServer;

  @Inject("CreatePost")
  createPost?: CreatePost;

  @Inject("GetPost")
  getPost?: GetPost;

  @Inject("ListPosts")
  listPosts?: ListPosts;

  @Inject("SearchPost")
  searchPost?: SearchPost;

  @Inject("DeletePost")
  deletePost?: DeletePost;

  @Inject("ClearPosts")
  clearPosts?: ClearPosts;

  constructor() {
    this.httpServer?.register(
      "post",
      "/posts",
      async (params: any, body: any) => {
        const input = body;
        const output = await this.createPost?.execute(input);
        return output;
      }
    );
    this.httpServer?.register(
      "get",
      "/posts/:id",
      async (params: any, body: any) => {
        const output = await this.getPost?.execute(params.id);
        return output;
      }
    );
    this.httpServer?.register(
      "get",
      "/posts",
      async (params: any, body: any) => {
        const output = await this.listPosts?.execute();
        return output;
      }
    );
    this.httpServer?.register(
      "get",
      "/posts/search/:keyword",
      async (params: any, body: any) => {
        const output = await this.searchPost?.execute(params.keyword);
        return output;
      }
    );
    this.httpServer?.register(
      "delete",
      "/posts/:id",
      async (params: any, body: any) => {
        const output = await this.deletePost?.execute(params.id);
        return output;
      }
    );
    this.httpServer?.register(
      "delete",
      "/posts",
      async (params: any, body: any) => {
        const output = await this.clearPosts?.execute();
        return output;
      }
    );
  }
}