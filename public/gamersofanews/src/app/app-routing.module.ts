import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LinkComponent } from './components/link/link.component';
import { SubmitComponent } from './components/submit/submit.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'submit', component: SubmitComponent },
  { path: 'link/:id', component: LinkComponent },
  { path: 'link', component: LinkComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
