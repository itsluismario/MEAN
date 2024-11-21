// post.service.ts
import { Injectable } from '@angular/core';
import { TPost, TPostCreated, TMongoDBResponse,TPostResponse, TPostGetResponse } from './post.model';
import { map, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

interface UpdatePostResponse {
  message: string;
  imagePath: string | null;
}

const BACKEND_URL = environment.apiUrl + '/posts';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: TPost[] = [];
  private postsUpdated = new Subject<{posts: TPost[], postCount: number}>()

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postPerPage: number, currentPage: number) {

    const queryParams = `?pagesize=${postPerPage}&page=${currentPage}`;

    this.http
      .get<{message: string, posts: TPost[], maxPosts: number, creator: string}>(BACKEND_URL + queryParams)
      .pipe(map(postData => {
        return {
          posts: postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post.id,
              imagePath: post.imagePath,
              creator: post.creator
            }
          }),
          maxPosts: postData.maxPosts
        }
      })
    )
    .subscribe(transformedPostData => {
      this.posts = transformedPostData.posts;
      this.postsUpdated.next({
        posts: [...this.posts],
        postCount: transformedPostData.maxPosts
      })
    })
  }

  getPost(id: string) {
    return this.http.get<TPostGetResponse>( BACKEND_URL + '/' + id);
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
      .post<{ message: string, post: TPost }>(BACKEND_URL, postData)
      .subscribe((responseData) => {
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
        creator: null
      }
    }
    this.http
      .put<UpdatePostResponse>(BACKEND_URL + '/' + id, postData)
      .subscribe(response =>
      {
        this.router.navigate(['/']);
      }
      );
  }

  deletePost(postId: string) {
    return this.http.delete(BACKEND_URL + '/' + postId)
  }

}
