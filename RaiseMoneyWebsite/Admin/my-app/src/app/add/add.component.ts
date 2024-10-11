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
          alert('成功添加'); // 显示成功添加的警告  
          this.close(); // 关闭模态框  
        },  
        error => {  
          console.error('添加筹款活动时出错:', error);  
        }  
      );  
    }  
}
