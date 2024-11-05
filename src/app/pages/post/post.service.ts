// post.service.ts
import { Injectable } from '@angular/core';
import { TPost, TMongoDBResponse } from './post.model'
import { map, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: TPost[] = [];
  private postsUpdated = new Subject<TPost[]>()

  constructor(private http: HttpClient) {}

  private transformPostData(post: { _id: string; title: string; content: string }): TPost {
    return {
      id: post._id,
      title: post.title,
      content: post.content
    };
  }

  getPosts(){
    this.http.get<TMongoDBResponse>('http://localhost:3000/api/posts')
      .pipe(
        map(response => response.posts.map(this.transformPostData))
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  onAddPost(title: string, content: string) {
    const post: TPost = {id: null, title: title, content: content};
    this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

}
