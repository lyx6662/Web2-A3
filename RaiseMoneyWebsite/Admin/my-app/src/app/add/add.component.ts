import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from '../../data.service';
import { FundraiserDetails } from '../../fundraiserDetails';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
    @Input() isVisible = false;
    @Output() closeEvent = new EventEmitter<void>();

    fundraiserDetails: FundraiserDetails = {  
      ORGANIZER: '',  
      CAPTION: '',  
      TARGET_FUNDING: 0,  
      CURRENT_FUNDING: 0,  
      CITY: '',  
      CATEGORY_ID:0,
      ACTIVE: 0,

    } as FundraiserDetails; 

    constructor(
      private dataService: DataService,
    ) {}

    close() {  
      this.fundraiserDetails = {    
        ORGANIZER: '',    
        CAPTION: '',    
        TARGET_FUNDING: 0,    
        CURRENT_FUNDING: 0,    
        CITY: '',    
        CATEGORY_ID: 0,  
        ACTIVE: 0,  
      } as FundraiserDetails;  
      
      this.closeEvent.emit();  
    }  
    saveFundraiser(fundraiserDetails: FundraiserDetails): void {  
      this.dataService.create(fundraiserDetails).subscribe(  
        response => {  
          alert('Successful addition'); // A successful addition warning is displayed
          this.close(); // Close the mode box
        },  
        error => {  
          console.error('An error occurred adding a fundraiser:', error);  
        }  
      );  
    }  
}
