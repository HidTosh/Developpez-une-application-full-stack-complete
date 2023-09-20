import { Component, OnInit } from '@angular/core';
import {Post} from "../../interfaces/post.interface";
import {PostsService} from "../../services/posts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Comment} from "../../interfaces/comment.interface";
import {CommentService} from "../../services/comment.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public post! : Post;
  public onError = false;
  public comments!: Array<Comment>;
  public postId!: number;
  public commentForm: FormGroup = this.formBuilder.group({name: [], email: [], id: []});

  constructor(
    private commentService: CommentService,
    private postsService: PostsService,
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.postId = this.route.snapshot.params['id'];
    this.getCurrentPost();
    this.getListPostsComments();
    this.initForm()
  }

  public getCurrentPost(): void {
    this.postsService.getPost(this.postId)
      .subscribe({
          next: (post: Post) => {
            //if (!post) {
              this.post = post

            //this.router.navigate(['/posts'])
          },
          error: err => {
            console.error('An error occurred :', err);
          }
      })
  }

  public getListPostsComments(): void {
    this.commentService.getPostsComments(this.postId)
      .subscribe(
        (comments: Array<Comment>) => {
          console.log(comments)
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
  const formData = new FormData();
  formData.append('content', this.commentForm!.get('content')?.value);
  formData.append('post_id', this.postId.toString());


  this.commentService.createComments(formData).subscribe(
    (_) => {
      this.getListPostsComments();

      this.initForm();

      this.matSnackBar.open('Comment posted !', 'Close', { duration: 3000 })
    }
  )
}


}
