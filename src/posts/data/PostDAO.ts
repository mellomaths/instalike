import { CreatePostData } from "../CreatePost";
import { GetPostData } from "../GetPost";
import { ListPostsData } from "../ListPosts";
import { SearchPostData } from "../SearchPost";

export interface PostDAO
  extends ListPostsData,
    CreatePostData,
    GetPostData,
    SearchPostData {}
