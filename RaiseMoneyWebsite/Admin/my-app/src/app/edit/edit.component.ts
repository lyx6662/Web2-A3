import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FundraiserDetails } from '../../fundraiserDetails';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
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
    FUNDRAISER_ID: 0,

  } as FundraiserDetails; 

  constructor(
    private dataService: DataService,
  ) {}

  close() {  

    this.closeEvent.emit();  
  }  

  editFundraiser(fundraiserDetails: FundraiserDetails): void {  
    this.dataService.update(fundraiserDetails).subscribe(  
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
