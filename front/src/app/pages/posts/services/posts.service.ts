import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Post } from "../interfaces/post.interface";
import { AuthSuccess } from "../../../auth/interfaces/authSuccess.interface";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private pathService: string = 'api/posts';

  constructor(private httpClient: HttpClient) { }

  public getPostsSubscriptions(listIds: Array<number>): Observable<Array<Post>> {
    return this.httpClient.get<Array<Post>>(`${this.pathService}/subscription?values=${listIds}`);
  }

  public create(formPost: FormData): Observable<AuthSuccess> {
    return this.httpClient.post<AuthSuccess>(`${this.pathService}`, formPost);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.pathService}/${id}`);
  }

  public getPost(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.pathService}/${id}`);
  }
}
