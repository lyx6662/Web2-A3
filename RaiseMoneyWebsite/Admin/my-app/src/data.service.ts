import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { FundraiserDetails } from './fundraiserDetails';
import { HttpClient} from '@angular/common/http';
import { Giver } from './giver';

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
    catchError(error => {  
      // 在这里处理错误，可以发出警告或者记录错误  
      console.error('Error deleting fundraiser:', error);  
      // 返回一个 Observable，以便调用者可以处理错误  
      return throwError('Error deleting fundraiser');  
    })  
  );  
}
//管理端更新筹款人
  public update(fundraiser: FundraiserDetails): Observable<any> {
    return this.http.put(`${this.apiUrl}/fundraiser/${fundraiser.FUNDRAISER_ID}`, fundraiser);
  }

  public getGiver(id:number): Observable<any> {
    return this.http.get(`${this.apiUrl}/fundraiser/${id}`)
  }
}
