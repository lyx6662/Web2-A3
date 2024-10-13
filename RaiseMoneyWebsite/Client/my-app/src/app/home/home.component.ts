import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { FundraiserDetails } from '../../someInterfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  ngOnInit() {
    this.getAllFundraiser();
  }
  fundraisers: FundraiserDetails[] = [];
  message: string = '';

  constructor(
    private dataService: DataService,
    private router: Router,
  ) {}

  getAllFundraiser(){
    this.dataService.AllDetails().subscribe({
      next: (fundraisers: FundraiserDetails[]) => {
        this.fundraisers = fundraisers;
      },
      error: (err: any) => {
        this.message = 'Error: ' + err.status;
      },
    });
  }



  navigateToFundraiser(fundraiserId: number) {
    this.router.navigate(['/fundraiser']);
    localStorage.setItem("ID",`${fundraiserId}`);
  }

}
