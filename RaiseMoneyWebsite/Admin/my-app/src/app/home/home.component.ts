import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { FundraiserDetails } from '../../fundraiserDetails';


@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  ngOnInit() {
    this.getAllFundraiser();
  }
  fundraisers: FundraiserDetails[] = [];
  message: string = '';
  isModalVisible = false;
  modalType: string = '';

  constructor(
    private dataService: DataService,
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

  openMyModal(type: string) {  
    this.isModalVisible = true;  
    this.modalType = type;
  }  
  
  handleModalClose() {  
    this.isModalVisible = false;  
    this.modalType = '';
    this.getAllFundraiser();
  }  
}
