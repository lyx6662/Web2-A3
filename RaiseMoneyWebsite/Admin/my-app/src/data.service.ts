import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { FundraiserDetails } from './fundraiserDetails';
import { HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3060/api/raisemoney';

  constructor(private http: HttpClient) {}
  //http to manage all fundraiser information on the main page
  public AllDetails(): Observable<FundraiserDetails[]> {
    return this.http.get<FundraiserDetails[]>(this.apiUrl);
  }
  //Insert a new fundraiser on the admin side
  public create(fundraiser: FundraiserDetails): Observable<any> {
    return this.http.post(this.apiUrl+'/fundraiser', fundraiser);
  }
//Administrative delete
public delete(id: number): Observable<any> {  
  return this.http.delete(`${this.apiUrl}/fundraiser/${id}`).pipe(  
    catchError(error => {  
      //This is where errors are handled, either by issuing warnings or logging errors  
      console.error('Error deleting fundraiser:', error);  
      // Returns an Observable so that the caller can handle the error  
      return throwError('Error deleting fundraiser');  
    })  
  );  
}
//Admin side updates fundraisers
  public update(fundraiser: FundraiserDetails): Observable<any> {
    return this.http.put(`${this.apiUrl}/fundraiser/${fundraiser.FUNDRAISER_ID}`, fundraiser);
  }

  public getGiver(id:number): Observable<any> {
    return this.http.get(`${this.apiUrl}/fundraiser/${id}`)
  }
}
