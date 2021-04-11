import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { IndicatorService } from 'src/services/indicator.service';
import { ProjectService } from 'src/services/project.service';
import { AppComponent } from './app.component';
import { routingModule } from './app.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraphicsComponent } from './dashboard/pages/graphics/graphics.component';
import { ItemsModule } from './items/items.module';
import { ItemsService } from './items/_services/items.service';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ProjectFormComponent } from './project/pages/crud/project-form/project-form.component';
import { DetailsProjectComponent } from './project/pages/details-project/details-project.component';
import { ProjectComponent } from './project/project.component';
import { AuthAdminGuard } from './_auth/guards/auth-admin.guard';
import { AuthGuard } from './_auth/guards/auth.guard';
import { AuthService } from './_auth/services/auth.service';
import { TokenIntercept } from './_auth/tokenintercept';
import { AlertModule } from './_shared/components/alert/alert.module';
import { LoadingComponent } from './_shared/components/loading/loading.components';
import { LoadingService } from './_shared/components/loading/loading.service';
import { MessageDialogService } from './_shared/components/message-dialog/confirm-dialog.service';
import { MessageDialogComponent } from './_shared/components/message-dialog/message-dialog.component';
import { FakeBackendInterceptor } from './_shared/fakebackend';
import { UiModule } from './_shared/ui/ui.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    GraphicsComponent,
    LogoutComponent,
    ProjectComponent,
    DetailsProjectComponent,
    MessageDialogComponent,
    LoadingComponent,
    ProjectFormComponent
  ],
  imports: [
    BrowserModule,
    UiModule,
    HttpClientModule,
    RouterModule,
    routingModule,
    ReactiveFormsModule,
    FormsModule,
    ItemsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    AlertModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/'},
    AuthGuard,
    AuthAdminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenIntercept,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FakeBackendInterceptor,
      multi: true
    },
    AuthService,
    ItemsService,
    IndicatorService,
    ProjectService,
    MessageDialogService,
    LoadingService,
    NgbToast
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
