import { Component, OnInit } from '@angular/core';
import { User} from "../../interfaces/user.interface";
import { AuthService } from "../../auth/services/auth.service";
import { SessionService } from "../../service/session.service";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private sessionService: SessionService
  ) { }
  ngOnInit() {

    this.authService.me().subscribe((user: User): void => {
      this.sessionService.logIn(user);
    });
  }


}
