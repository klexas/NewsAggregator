import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LinkComponent } from './components/link/link.component';
import { SubmitComponent } from './components/submit/submit.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'submit', component: SubmitComponent },
  { path: 'link/:id', component: LinkComponent },
  { path: 'link', component: LinkComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
