import { ClearPostsRepository } from "../../application/posts/ClearPosts";
import { CreatePostRepository } from "../../application/posts/CreatePost";
import { DeletePostRepository } from "../../application/posts/DeletePost";
import { GetPostRepository } from "../../application/posts/GetPost";
import { ListPostsRepository } from "../../application/posts/ListPosts";
import { SearchPostRepository } from "../../application/posts/SearchPost";
import { UploadImageRepository } from "../../application/posts/UploadImage";

export interface PostsRepository
  extends ListPostsRepository,
    CreatePostRepository,
    GetPostRepository,
    SearchPostRepository,
    DeletePostRepository,
    ClearPostsRepository,
    UploadImageRepository {}
