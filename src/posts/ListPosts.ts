import { Post } from "./Post";

export class ListPosts {
  constructor(private readonly data: ListPostsData) {}

  async execute(): Promise<Post[]> {
    return this.data.listPosts();
  }
}

export interface ListPostsData {
  listPosts(): Promise<Post[]>;
}
