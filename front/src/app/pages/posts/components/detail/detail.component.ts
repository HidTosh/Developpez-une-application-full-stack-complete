import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from "../../interfaces/post.interface";
import { PostsService } from "../../services/posts.service";
import { ActivatedRoute } from "@angular/router";
import { Comment } from "../../interfaces/comment.interface";
import { CommentService } from "../../services/comment.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  public post! : Post;
  public onError: boolean = false;
  public comments!: Array<Comment>;
  public postId!: number;
  public commentForm: FormGroup = this.formBuilder.group({name: [], email: [], id: []});
  public backToPost: string = '/posts';
  public postCommentSubscription$!: Subscription;
  public getCommentSubscription$!: Subscription;
  public getPostSubscription$!: Subscription;

  constructor(
    private commentService: CommentService,
    private postsService: PostsService,
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.postId = this.route.snapshot.params['id'];
    this.getCurrentPost();
    this.getListPostsComments();
    this.initForm()
  }

  ngOnDestroy(): void {
    this.postCommentSubscription$?.unsubscribe();
    this.getCommentSubscription$?.unsubscribe();
    this.getPostSubscription$?.unsubscribe();
  }

  public getCurrentPost(): void {
    this.getPostSubscription$ = this.postsService.getPost(this.postId)
      .subscribe({
          next: (post: Post): void => {
              this.post = post
          },
          error: err => {
            console.error('An error occurred :', err);
          }
      })
  }

  public getListPostsComments(): void {
    this.getCommentSubscription$ = this.commentService.getPostsComments(this.postId)
      .subscribe(
        (comments: Array<Comment>): void => {
          this.comments = comments
        }
      )
  }

  public initForm(): void {
    this.commentForm = this.formBuilder.group({
      content: [
        '', [ Validators.required ]
      ]
    });
  }

  public submit(): void {
    const formData: FormData = new FormData();
    formData.append('content', this.commentForm!.get('content')?.value);
    formData.append('post_id', this.postId.toString());
    this.postCommentSubscription$ = this.commentService.createComments(formData).subscribe(
      (_): void => {
        this.getListPostsComments();
        this.initForm();
        this.matSnackBar.open('Comment posted !', 'Close', { duration: 3000 })
      }
    )
  }
}
