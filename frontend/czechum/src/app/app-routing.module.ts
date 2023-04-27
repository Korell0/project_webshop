import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from './components/info/info.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { KosarComponent } from'./components/kosar/kosar.component';
import { OrderComponent } from'./components/order/order.component';
import { LoginComponent } from'./components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import {RegComponent} from'./components/reg/reg.component';

const routes: Routes = [
  { path: 'info', component: InfoComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'kosar', component: KosarComponent },
  { path: 'rendelesek', component: OrderComponent },
  { path: 'termekek', component: ProductComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reg', component: RegComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
