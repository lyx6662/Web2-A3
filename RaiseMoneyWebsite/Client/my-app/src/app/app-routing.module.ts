import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { FundraiserComponent } from './fundraiser/fundraiser.component';
import { DonationComponent } from './donation/donation.component';

const routes: Routes = [
      // { path: '',   redirectTo: '/home', pathMatch: 'full' },
      { path: '', component: HomeComponent,title:'Home' },
      { path: 'search', component: SearchComponent,title:'Search' },
      { path: 'fundraiser', component: FundraiserComponent,title:'Fundraiser' },
      { path: 'donation', component: DonationComponent,title:'Donation' },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
