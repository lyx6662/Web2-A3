import { Component, OnInit, Type } from '@angular/core';
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
  fundraiserToEditForModal!: FundraiserDetails;

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

  openMyModal(type: string, fundraiser?: FundraiserDetails) {  
    this.isModalVisible = true;  
    this.modalType = type;  
    if (type === 'edit' && fundraiser) {  
      this.fundraiserToEditForModal = fundraiser;  
    } 
  }  
  
  handleModalClose() {  
    this.isModalVisible = false;  
    this.modalType = '';
    this.getAllFundraiser();
  } 
  
  deleteFundraiser(ID: number): void {  
    this.dataService.delete(ID).subscribe(  
      () => {  
        this.getAllFundraiser();
        alert('The fundraiser has been deleted'); // A successful deletion warning is displayed
        // Here you can add other logic after successful deletion, such as refreshing the list
      },  
      error => {
        console.error('An error occurred while deleting a fundraiser:', error);
        
            alert('The fundraiser has donations and cannot be deleted！');
        
        // Additional error handling logic can be added here, such as displaying an error message to the user
    }
    );  
  }

}
