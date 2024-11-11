// post.model.ts

import { FormControl } from '@angular/forms';

export interface TPostCreated {
  title: string;
  content: string;
}

export interface TPost {
  id: string;
  title: string;
  content: string;
  imagePath: string | null;
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

export interface TPostForm {
  title: FormControl<string | null>;
  content: FormControl<string | null>;
  image: FormControl<File | null>;
}
