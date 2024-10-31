import { Injectable } from '@angular/core';
import { TPost } from './post.model'

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: TPost[] = [];

  getPosts(){
    return [...this.posts];
  }

  onAddPost(title: string, content: string) {
    const post: TPost = {title: title, content: content};
    this.posts.push(post)
  }
}
