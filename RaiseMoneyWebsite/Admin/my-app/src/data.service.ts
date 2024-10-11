import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { FundraiserDetails } from './fundraiserDetails';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3060/api/raisemoney';

  constructor(private http: HttpClient) {}
  //管理端主页所有筹款人信息的http
  public AllDetails(): Observable<FundraiserDetails[]> {
    return this.http.get<FundraiserDetails[]>(this.apiUrl);
  }
  //管理端插入新的筹款人
  public create(fundraiser: FundraiserDetails): Observable<any> {
    return this.http.post(this.apiUrl+'/fundraiser', fundraiser);
  }
//管理端删除
  public delete(id: number): Observable<any> {

    return this.http.delete(`${this.apiUrl}/fundraiser/${id}`).pipe(  
      catchError(this.handleError)  
    );  
  }
//接收错误方便给有捐赠时添加特殊提示
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400:
          errorMessage = `Error: ${error.error}`;
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
      }
    }
    console.error('API Error:', errorMessage);
    return throwError(errorMessage);
  }
//管理端更新筹款人
  public update(fundraiser: FundraiserDetails): Observable<any> {
    return this.http.put(`${this.apiUrl}/fundraiser/${fundraiser.FUNDRAISER_ID}`, fundraiser);
  }
}
