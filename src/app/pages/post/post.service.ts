// post.service.ts
import { Injectable } from '@angular/core';
import { TPost, TPostCreated, TMongoDBResponse,TPostResponse } from './post.model';
import { map, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: TPost[] = [];
  private postsUpdated = new Subject<TPost[]>()

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{message: string, posts: TPost[]}>('http://localhost:3000/api/posts')
      .subscribe(response => {
        this.posts = response.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPost(id: string) {
    return this.posts.find(p => p.id === id);
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  onAddPost(title: string, content: string) {
    const post: TPostCreated = { title, content };
    this.http
      .post<TPostResponse>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        const createdPost: TPost = {
          id: responseData.postId,
          title: post.title,
          content: post.content
        };
        this.posts.push(createdPost);
        this.postsUpdated.next([...this.posts]);
      });
  }

  updatePost(id: string, title: string, content: string) {
    const post: TPost = { id:id, title: title, content: content };
    this.http
      .put('http://localhost:3000/api/posts' + id, post)
      .subscribe(response => console.log(response));
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatePosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatePosts;
        this.postsUpdated.next([...this.posts]);
      })
  }

}
