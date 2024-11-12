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
  pageSizeOptions = [1, 2, 3, 50];
  displayedPosts: TPost[] = [];
  totalPages = 0;
  Math = Math;

  paginationForm = new FormGroup({
    pageSize: new FormControl(this.postsPerPage)
  });

  constructor(public postService: PostsService) {
    this.paginationForm.get('pageSize')?.valueChanges.subscribe(size => {
      if (size) {
        this.postsPerPage = size;
        this.currentPage = 1; // Reset to first page when changing size
        this.updateDisplayedPosts();
      }
    });
  }

  ngOnInit(): void {
    this.postService.getPosts();
    this.postsSub = this.postService.getPostUpdateListener()
      .subscribe((posts: TPost[]) => {
        this.isLoading = true;
        this.posts = posts;
        this.totalPosts = posts.length;
        this.updateDisplayedPosts();
      });
  }

  updateDisplayedPosts() {
    const start = (this.currentPage - 1) * this.postsPerPage;
    const end = start + this.postsPerPage;
    this.displayedPosts = this.posts.slice(start, end);
    this.totalPages = Math.ceil(this.posts.length / this.postsPerPage);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedPosts();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      // Show first page, last page, and pages around current page
      if (
        i === 1 ||
        i === this.totalPages ||
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
    this.postService.deletePost(postId);
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
