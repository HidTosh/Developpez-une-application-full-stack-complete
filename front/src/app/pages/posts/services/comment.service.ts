import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AuthSuccess } from "../../../auth/interfaces/authSuccess.interface";
import { Comment } from "../interfaces/comment.interface";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private pathService: string = 'api/comments';

  constructor(private httpClient: HttpClient) { }

  public getPostsComments(postId: number): Observable<Array<Comment>> {
    return this.httpClient.get<Array<Comment>>(`${this.pathService}/post/${postId}`);
  }

  public createComments(formComment: FormData): Observable<AuthSuccess> {
    return this.httpClient.post<AuthSuccess>(`${this.pathService}`, formComment);
  }
}
