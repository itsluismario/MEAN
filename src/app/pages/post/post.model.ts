// post.model.ts
export interface TPost {
  id: string | null;
  title: string;
  content: string;
}

export interface TMongoDBResponse {
  message: string;
  posts: {
    _id: string;
    title: string;
    content: string;
  }[];
}
