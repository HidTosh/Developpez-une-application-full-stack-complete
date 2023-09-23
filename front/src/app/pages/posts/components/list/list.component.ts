import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionService } from "../../../topic/service/subscription.service";
import { PostsService } from "../../services/posts.service";
import { Post } from "../../interfaces/post.interface";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  public lentListPosts! : number;
  public listPosts! : Array<Post>;
  public subscriptionSubscription$!: Subscription;
  public postSubscription$!: Subscription;

  constructor(
    private subscriptionService: SubscriptionService,
    private postsService: PostsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getSubscriptionsPosts()
  }

  ngOnDestroy(): void {
    this.subscriptionSubscription$?.unsubscribe();
    this.postSubscription$?.unsubscribe();
  }

  public getSubscriptionsPosts(): void {
    this.subscriptionSubscription$ = this.subscriptionService.getTopics()
      .subscribe(
        (listInteger: Array<number>): void => {
          this.postSubscription$ = this.postsService.getPostsSubscriptions(listInteger)
            .subscribe(
              (list: Array<Post>): void => {
                this.listPosts = list;
                this.lentListPosts = list.length;
              }
            )
        }
      )
  }

  public createPost(): void {
    this.router.navigate(['/posts/create'])
  }

  public sortPosts(): void {
    this.listPosts = this.listPosts.reverse()
  }

  public viewPost(id: number): void {
    this.router.navigate([`/posts/detail/${id}`])
  }
}
