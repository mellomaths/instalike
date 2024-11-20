import { ClearPostsData } from "../ClearPosts";
import { CreatePostData } from "../CreatePost";
import { DeletePostData } from "../DeletePost";
import { GetPostData } from "../GetPost";
import { ListPostsData } from "../ListPosts";
import { SearchPostData } from "../SearchPost";

export interface PostDAO
  extends ListPostsData,
    CreatePostData,
    GetPostData,
    SearchPostData,
    DeletePostData,
    ClearPostsData {}
