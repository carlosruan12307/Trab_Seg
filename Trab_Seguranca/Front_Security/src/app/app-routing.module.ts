import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginGuardGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [LoginGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
