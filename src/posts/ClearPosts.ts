export class ClearPosts {
  constructor(private data: ClearPostsData) {}

  async execute(): Promise<void> {
    await this.data.clearPosts();
  }
}

export interface ClearPostsData {
  clearPosts(): Promise<void>;
}
