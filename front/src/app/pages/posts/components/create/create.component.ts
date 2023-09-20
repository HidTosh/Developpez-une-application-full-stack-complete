import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../interfaces/user.interface";
import {TopicService} from "../../../topic/service/topic.service";
import {Post} from "../../interfaces/post.interface";
import {Topic} from "../../../../interfaces/topic.interface";
import {PostsService} from "../../services/posts.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public onError = false;
  public postForm: FormGroup = this.formBuilder.group({name: [], email: [], id: []});
  public topics!: Array<Topic>;

  constructor(
    private topicService: TopicService,
    private postsService: PostsService,
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.topicService.getTopics()
      .subscribe(
      (topics: Array<Topic>) => {
            this.topics = topics;
      })
    this.initForm()
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
    console.log(this.postForm.value)
    console.log("sddfsfsdf")

    const formData = new FormData();
    formData.append('topic_id', this.postForm!.get('topic_id')?.value);
    formData.append('title', this.postForm!.get('title')?.value);
    formData.append('description', this.postForm!.get('description')?.value);

    this.postsService.create(formData).subscribe(
      (_) => {
        this.matSnackBar.open('Post created !', 'Close', { duration: 3000 })
        this.router.navigateByUrl('posts');
      }
    )
  }
}
