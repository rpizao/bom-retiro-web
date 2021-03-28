import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraphicsComponent } from './dashboard/pages/graphics/graphics.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { DetailsProjectComponent } from './project/pages/details-project/details-project.component';
import { ProjectComponent } from './project/project.component';
import { AuthGuard } from './_auth/guards/auth.guard';

const routes: Routes = [
    {
      path: 'dashboard',
      children: [
        { path: '', component: DashboardComponent , canActivate: [AuthGuard] },
        { path: 'graphics/:code', component: GraphicsComponent , canActivate: [AuthGuard] }
      ]
    },
    {
      path: 'projects',
      children: [
        { path: '', component: ProjectComponent , canActivate: [AuthGuard] },
        { path: 'detail/:code', component: DetailsProjectComponent , canActivate: [AuthGuard] }
      ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '',  redirectTo: '/dashboard', pathMatch: 'full' }, // catch all route

];
export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);
