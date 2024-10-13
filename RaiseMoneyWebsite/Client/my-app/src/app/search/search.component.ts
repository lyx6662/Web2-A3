import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { Category, FundraiserDetails, Search } from '../../someInterfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  ngOnInit() {
    this.getAllCategory();
  }

  urlPart:string='';
  message: string = '';
  showFundraiserDetails = false;
  fundraiserDetails: FundraiserDetails[]=[];

category: Category[] = [];

  search: Search = {  
    ORGANIZER: '',  
    CATEGORY_NAME:'Please select a category',
    CITY: '', 
  } as Search;

  constructor(
    private router: Router,
    private dataService: DataService,
  ) {

  }

getAllCategory(){
  this.dataService.AllCategory().subscribe({
    next: (category: Category[]) => {
      this.category = category;
    },
    error: (err: any) => {
      this.message = 'Error: ' + err.status;
    },
  });
}

startSearch(organizer:string,city:string,category:string){


  console.log(category);
if(category==='Please select a category'){
    category='';
}
if(organizer||city||category){
  this.showFundraiserDetails = true;
this.urlPart=organizer+'&'+city+'&'+category;
console.log(this.urlPart);

this.dataService.getSearch(this.urlPart).subscribe({
  next: (fundraiser: FundraiserDetails[]) => {
    this.fundraiserDetails = fundraiser;
  },
  error: (err: any) => {
    this.message = 'Error: ' + err.status;
  },
});
}else{
  alert('Fill in at least one information to search for')
}
}

navigateToFundraiser(fundraiserId: number) {
  this.router.navigate(['/fundraiser']);
  localStorage.setItem("ID",`${fundraiserId}`);
}
clear(){
  this.search.CATEGORY_NAME='Please select a category';
  this.search.CITY='';
  this.search.ORGANIZER='';
  this.fundraiserDetails = [];
  this.showFundraiserDetails = false;
}

}
