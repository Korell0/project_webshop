import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from './components/info/info.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import {KosarComponent} from'./components/kosar/kosar.component';
import {OrderComponent} from'./components/order/order.component';
import {ProudctComponent} from'./components/proudct/proudct.component';
import {LoginComponent} from'./components/login/login.component';

const routes: Routes = [
  { path: 'info', component: InfoComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'kosar', component: KosarComponent },
  { path: 'rendelesek', component: OrderComponent },
  { path: 'termekek', component: ProudctComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reg', component: HomepageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
