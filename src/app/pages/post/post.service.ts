// post.service.ts
import { Injectable } from '@angular/core';
import { TPost } from './post.model'
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: TPost[] = [];
  private postsUpdated = new Subject<TPost[]>()

  constructor(private http: HttpClient) {}

  getPosts(){
    this.http.get<{message: string, posts: TPost[]}>('http://localhost:3000/api/posts')
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  onAddPost(title: string, content: string) {
    const post: TPost = {id: null, title: title, content: content};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
