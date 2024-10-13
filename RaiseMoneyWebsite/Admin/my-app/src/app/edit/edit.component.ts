import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FundraiserDetails } from '../../fundraiserDetails';
import { DataService } from '../../data.service';
import { Giver } from '../../giver';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  @Input() isVisible = false;
  @Output() closeEvent = new EventEmitter<void>();
  @Input() fundraiserToEdit!: FundraiserDetails;
  
  donations: Giver[] = [];

    fundraiserDetails: FundraiserDetails = {
      ACTIVE: 0,
      CAPTION: '',
      CATEGORY_ID: 0,
      CATEGORY_NAME:'',
      CITY: '',
      CURRENT_FUNDING: 0,
      FUNDRAISER_ID: 0,
      TARGET_FUNDING: 0,
      ORGANIZER: ''

  } as FundraiserDetails;

  constructor(private dataService: DataService) {

  }
  ngOnChanges(changes: SimpleChanges): void {    
    if (changes['fundraiserToEdit']) {  
      const currentValue = changes['fundraiserToEdit'].currentValue;  
      const previousValue = changes['fundraiserToEdit'].previousValue;  
  
      // Check whether the current value is different from the previous value  
      if (currentValue && currentValue !== previousValue) {  
        this.fundraiserDetails = { ...currentValue };  

        console.log('Current FUNDRAISER_ID:', currentValue.FUNDRAISER_ID); // Add this line to print FUNDRAISER_ID
        this.dataService.getGiver(currentValue.FUNDRAISER_ID).subscribe(
          donations => {
              this.donations = donations;
          },
          error => {
              console.error('Error fetching donations:', error);
          }
      );

      }  


    }  
  }   
  
 
  close() {  

    this.closeEvent.emit();  
  }  


  editFundraiser(fundraiserDetails: FundraiserDetails): void {  
    this.dataService.update(fundraiserDetails).subscribe(  
      response => {  
        alert('Successful change'); // A successful addition warning is displayed 
        this.close(); // Close the mode box
      },  
      error => {  
        console.error('An error occurred adding a fundraiser:', error);  
      }  
    );  
  }  

}

