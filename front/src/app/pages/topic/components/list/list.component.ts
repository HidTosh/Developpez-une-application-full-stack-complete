import {Component, OnDestroy, OnInit} from '@angular/core';
import { Topic } from "../../../../interfaces/topic.interface";
import { SubscriptionService } from "../../service/subscription.service";
import { TopicService } from "../../service/topic.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  public lentListTopics! : number;
  public listTopic! : Array<Topic>;
  public getTopicsSubscription$!: Subscription;
  public topicSubscription$!: Subscription;
  public createSubscription$!: Subscription;

  constructor(
    private subscriptionService: SubscriptionService,
    private topicService: TopicService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getNoneSubscriptionsTopics()
  }

  ngOnDestroy(): void {
    this.getTopicsSubscription$?.unsubscribe();
    this.topicSubscription$?.unsubscribe();
    this.createSubscription$?.unsubscribe();
  }

  public getNoneSubscriptionsTopics(): void {
    this.getTopicsSubscription$ = this.subscriptionService.getTopics()
      .subscribe(
        (listInteger: Array<number>) => {
          this.topicSubscription$ = this.topicService.getNoneSubscriptionsTopics(listInteger)
            .subscribe(
              (list: Array<Topic>) => {
                this.listTopic = list;
                this.lentListTopics = list.length;
              })
        }
      )
  }

  public scribeTopic(indexOfTopic: number, topic: Topic): void {
    this.createSubscription$ = this.subscriptionService.create(topic.id)
      .subscribe({
          next: (_) => {
            this.matSnackBar.open(`${topic.title} subscribed !`, 'Close', { duration: 3000 })
            this.listTopic.splice(indexOfTopic, 1);
          },
          error: err => {
            console.error('An error occurred :', err);
            this.matSnackBar.open(`An error occurred !`, 'Close', { duration: 3000 });
          }
        }
      )
  }
}
