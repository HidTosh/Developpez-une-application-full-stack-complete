import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "./auth/services/auth.service";
import { SessionService } from "./service/session.service";
import { User } from "./interfaces/user.interface";
import { Location } from '@angular/common';
import { Observable, Subscription } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public title: string = 'front';
  public routerLinkAccount: string = "/user/account";
  public routerLinkTopic: string = "/topics";
  public routerLinkPost: string = "/posts";
  public routerLinkHome: string = "/";
  public authSubscription$!: Subscription;

  constructor(
    private sessionService: SessionService,
    private authService: AuthService,
    private location: Location,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.autoLog();
  }

  ngOnDestroy(): void {
      this.authSubscription$?.unsubscribe();
  }

  public $isLogged(): Observable<boolean> {
    return this.sessionService.$isLogged();
  }

  public showHeader(): boolean {
    return this.router.url == '/';
  }

  public autoLog(): void {
    this.authSubscription$ = this.authService.me().subscribe({
      next: (user: User): void => {
        this.sessionService.logIn(user);
        const url: string = this.location.path();
        if ((url == '') || (url == '/login') || (url == '/register')) {
          this.router.navigate(['posts']);
        } else {
          this.router.navigate([url]);
        }
      },
      error: (_) => {
        this.sessionService.logOut();
      }
    })
  }
}
