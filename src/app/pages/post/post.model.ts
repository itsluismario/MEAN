// post.model.ts
export interface TPostCreated {
  title: string;
  content: string;
}

export interface TPost {
  id: string;
  title: string;
  content: string;
}

export interface TPostResponse {
  message: string;
  postId: string;
  post: TPost;
}
export interface TMongoDBResponse {
  message: string;
  posts: {
    _id: string;
    title: string;
    content: string;
  }[];
}

export interface TPostGetResponse {
  _id: string;
  title: string;
  content: string;
}
