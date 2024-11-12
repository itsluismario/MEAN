// post.service.ts
import { Injectable } from '@angular/core';
import { TPost, TPostCreated, TMongoDBResponse,TPostResponse, TPostGetResponse } from './post.model';
import { map, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface UpdatePostResponse {
  message: string;
  imagePath: string | null;
}

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: TPost[] = [];
  private postsUpdated = new Subject<TPost[]>()

  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    this.http
      .get<{message: string, posts: TPost[]}>('http://localhost:3000/api/posts')
      .subscribe(response => {
        this.posts = response.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPost(id: string) {
    return this.http.get<TPostGetResponse>('http://localhost:3000/api/posts/' + id);
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string, image: File | null) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    if (image) {
      postData.append('image', image, image.name);
    }
    this.http
      .post<{ message: string, post: TPost }>('http://localhost:3000/api/posts', postData)
      .subscribe((responseData) => {
        const post: TPost = {
          id: responseData.post.id,
          title: title,
          content: content,
          imagePath: responseData.post.imagePath
        };
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  updatePost(id: string, title: string, content: string, image: File | string | null | undefined) {
    let postData: TPost | FormData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('title', title);
      postData.append('content', content);
      if (image instanceof File) {
        // Now TypeScript knows image is definitely a File here
        postData.append('image', image, title);
      }
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image || null,
      }
    }
    this.http
      .put<UpdatePostResponse>('http://localhost:3000/api/posts/' + id, postData)
      .subscribe(response =>
      {
        const updatedPost = [...this.posts];
        const oldPostIndex = updatedPost.findIndex(p => p.id === id);
        const post: TPost = {
          id: id,
          title: title,
          content: content,
          imagePath: response.imagePath
        };
        updatedPost[oldPostIndex] = post;
        this.posts = updatedPost;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      }
      );
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
