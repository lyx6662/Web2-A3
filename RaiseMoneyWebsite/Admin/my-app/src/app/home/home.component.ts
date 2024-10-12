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
        alert('筹款活动已删除'); // 显示成功删除的警告  
        // 这里可以添加其他成功删除后的逻辑，比如刷新列表等  
      },  
      error => {
        console.error('删除筹款活动时出错:', error);
        
            alert('该筹款活动有捐款，不能删除！');
        
        // 这里可以添加其他错误处理逻辑，比如显示错误消息给用户
    }
    );  
  }

}
