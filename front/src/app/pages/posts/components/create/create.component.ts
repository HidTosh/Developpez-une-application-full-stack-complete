import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TopicService } from "../../../topic/service/topic.service";
import { Topic } from "../../../../interfaces/topic.interface";
import { PostsService } from "../../services/posts.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {
  public onError = false;
  public postForm: FormGroup = this.formBuilder.group({name: [], email: [], id: []});
  public topics!: Array<Topic>;
  public topicSubscription$!: Subscription;
  public postSubscription$!: Subscription;
  public backToPost: string = '/posts';

  constructor(
    private topicService: TopicService,
    private postsService: PostsService,
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.topicSubscription$ = this.topicService.getTopics()
      .subscribe(
      (topics: Array<Topic>) => {
            this.topics = topics;
      })
    this.initForm()
  }

  ngOnDestroy(): void {
      this.topicSubscription$?.unsubscribe()
      this.postSubscription$?.unsubscribe();
  }

  public initForm(): void {
    this.postForm = this.formBuilder.group({
      topic_id: [
        '', [Validators.required]
      ],
      title: [
        '', [ Validators.required ]
      ],
      description: [
        '', Validators.required
      ]
    });
  }

  public submit(): void {
    const formData : FormData = new FormData();
    formData.append('topic_id', this.postForm!.get('topic_id')?.value);
    formData.append('title', this.postForm!.get('title')?.value);
    formData.append('description', this.postForm!.get('description')?.value);
    this.postSubscription$ = this.postsService.create(formData).subscribe(
      (_) => {
        this.matSnackBar.open('Post created !', 'Close', { duration: 3000 })
        this.router.navigateByUrl('posts');
      }
    )
  }
}
