import { Component } from '@angular/core';
import { FundraiserDetails, InputA } from '../../someInterfaces';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.css'
})
export class DonationComponent {
  fundraisers:FundraiserDetails[]=[];
  constructor(
    private dataService: DataService,
    private router: Router,
  ) {}
  message: string | null = null;
  inputA: InputA = { 
    Amount:0,
    Giver:'',
    FUNDRAISER_ID :0,
  } as InputA;

  ngOnInit() {
    this.getAFundraiser();
 }
 


  getAFundraiser(){
    const idString = localStorage.getItem('ID');
    const ID = Number(idString);  
    this.dataService.getAFundraiser(ID).subscribe({
      next: (fundraisers: FundraiserDetails[]) => {
        this.fundraisers = fundraisers;
       
      },
      error: (err: any) => {
        this.message = 'Error: ' + err.status;
      },
    });
  }


  Submit(inputA:InputA){
    const idString = localStorage.getItem('ID');
    const ID = Number(idString); 
    inputA.FUNDRAISER_ID=ID;
      if(inputA.Amount >= 5 && inputA.Giver !== ''){
        this.dataService.createDonation(this.inputA).subscribe(  
          response => {  
            alert(`Thank you for your donation to ${ID}`); 
            this.router.navigate(['/fundraiser']);
          },  
          error => {  
            console.error('error:', error);  
          }  
        );  
      }else if(inputA.Amount < 5 && inputA.Giver !== ''){
        alert('Minimum donation is A $5')
      }else{
        alert('Please fill in the data')
      }
  }

}
