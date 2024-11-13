// post-list.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  HlmAccordionContentComponent,
  HlmAccordionDirective,
  HlmAccordionIconDirective,
  HlmAccordionItemDirective,
  HlmAccordionTriggerDirective
} from '@spartan-ng/ui-accordion-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TPost } from './../post.model';
import { PostsService } from '../post.service';
import { Subscription } from 'rxjs';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { RouterModule } from '@angular/router';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import {
  HlmPaginationContentDirective,
  HlmPaginationDirective,
  HlmPaginationEllipsisComponent,
  HlmPaginationItemDirective,
  HlmPaginationLinkDirective,
  HlmPaginationNextComponent,
  HlmPaginationPreviousComponent,
} from '@spartan-ng/ui-pagination-helm';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    HlmAccordionContentComponent,
    HlmAccordionDirective,
    HlmAccordionIconDirective,
    HlmAccordionItemDirective,
    HlmAccordionTriggerDirective,
    HlmIconComponent,
    HlmButtonDirective,
    HlmSpinnerComponent,
    HlmPaginationContentDirective,
    HlmPaginationDirective,
    HlmPaginationEllipsisComponent,
    HlmPaginationItemDirective,
    HlmPaginationLinkDirective,
    HlmPaginationNextComponent,
    HlmPaginationPreviousComponent,
  ],
  templateUrl: './post-list.component.html',
})
// post-list.component.ts
export class PostListComponent implements OnInit, OnDestroy {
  posts: TPost[] = [];
  private postsSub!: Subscription;
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 3, 10];
  Math = Math;

  paginationForm = new FormGroup({
    pageSize: new FormControl(this.postsPerPage)
  });

  constructor(public postService: PostsService) {
    this.paginationForm.get('pageSize')?.valueChanges.subscribe(size => {
      if (size) {
        this.isLoading = true;
        this.postsPerPage = size;
        this.currentPage = 1;
        this.postService.getPosts(this.postsPerPage, this.currentPage);
      }
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postService
      .getPostUpdateListener()
      .subscribe((postData: {posts: TPost[], postCount: number}) => {
        this.posts = postData.posts;
        this.totalPosts = postData.postCount;
        this.isLoading = false;
      });
  }

  onPageChange(page: number) {
    const totalPages = Math.ceil(this.totalPosts / this.postsPerPage);
    if (page >= 1 && page <= totalPages) {
      this.isLoading = true;
      this.currentPage = page;
      this.postService.getPosts(this.postsPerPage, this.currentPage);
    }
  }

  getPageNumbers(): number[] {
    const totalPages = Math.ceil(this.totalPosts / this.postsPerPage);
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= this.currentPage - 1 && i <= this.currentPage + 1)
      ) {
        pages.push(i);
      }
    }
    return pages;
  }

  shouldShowEllipsis(index: number, pages: number[]): boolean {
    return index < pages.length - 1 && pages[index + 1] - pages[index] > 1;
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postService.deletePost(postId).subscribe(() => {
      this.postService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
