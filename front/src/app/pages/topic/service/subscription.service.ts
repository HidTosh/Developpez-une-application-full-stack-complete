import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AuthSuccess } from "../../../auth/interfaces/authSuccess.interface";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private pathService: string = '/api/subscriptions';

  constructor(private httpClient: HttpClient) { }

  public getTopics(): Observable<Array<number>> {
    return this.httpClient.get<Array<number>>(`${this.pathService}/topic_ids`);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.pathService}/topic/${id}`);
  }

  public create(id: number): Observable<AuthSuccess> {
    return this.httpClient.post<AuthSuccess>(`${this.pathService}/topic`, id);
  }
}
