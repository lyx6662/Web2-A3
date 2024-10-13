import { Component, ElementRef, ViewChild } from '@angular/core';
import { Donation, FundraiserDetails } from '../../someInterfaces';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-fundraiser',
  templateUrl: './fundraiser.component.html',
  styleUrl: './fundraiser.component.css'
})
export class FundraiserComponent {

  fundraisers:FundraiserDetails[]=[];

  constructor(
    private dataService: DataService,
    private router: Router,
  ) {}


  donations: Donation[] = [];

message: string | null = null;


ngOnInit() {
   this.getAFundraiser();
   this.getDonation();
   console.log(this.donations);
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

getDonation(){
  const idString = localStorage.getItem('ID');
  const ID = Number(idString);  
  this.dataService.getDonation(ID).subscribe({
    next: ( donations: Donation[]) => {
      this.donations = donations;
      console.log(this.donations);


    },
    error: (err: any) => {
      this.message = 'Error: ' + err.status;
    },
  });
}


navigateToDonation() {
  this.router.navigate(['/donation']);
}


}
