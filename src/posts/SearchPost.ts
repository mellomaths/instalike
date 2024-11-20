import { Post } from "./Post";

export class SearchPost {
  constructor(private readonly data: SearchPostData) {}

  async execute(keyword: string): Promise<Post[]> {
    return this.data.searchPost(keyword);
  }
}

export interface SearchPostData {
  searchPost(keyword: string): Promise<Post[]>;
}
