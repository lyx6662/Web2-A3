import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Category, FundraiserDetails ,Donation, InputA} from './someInterfaces';


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
  //显示所有类别
  public AllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/use/search/CATEGORY`);
  }
  //获取搜索结果
  public getSearch(str:string): Observable<any> {
    return this.http.get<FundraiserDetails>(`${this.apiUrl}/search/${str}`);
  }

  public getAFundraiser(ID:number): Observable<any> {
    return this.http.get<FundraiserDetails>(`${this.apiUrl}/${ID}`);
  }

  public getDonation(ID:number): Observable<any> {
    return this.http.get<Donation>(`${this.apiUrl}/fundraiser/${ID}`);
  }

  public createDonation(inputA: InputA): Observable<any> {
    return this.http.post(this.apiUrl+'/donation', inputA);
  }
}
