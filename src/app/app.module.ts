import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routingModule } from './app.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { UiModule } from './_shared/ui/ui.module';
import { FakeBackendInterceptor } from './_shared/fakebackend';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './_auth/guards/auth.guard';
import { TokenIntercept } from './_auth/tokenintercept';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

import { ItemsModule } from './items/items.module';

import { ItemsService } from './items/_services/items.service';
import { AuthService } from './_auth/services/auth.service';
import { IndicatorService } from 'src/services/indicator.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphicsComponent } from './dashboard/pages/graphics/graphics.component';
import { ProjectComponent } from './project/project.component';
import { DetailsProjectComponent } from './project/pages/details-project/details-project.component';
import { ProjectService } from 'src/services/project.service';
import { MessageDialogComponent } from './_shared/components/message-dialog/message-dialog.component';
import { MessageDialogService } from './_shared/components/message-dialog/confirm-dialog.service';

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
    BrowserAnimationsModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/'},
    AuthGuard,
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
    MessageDialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
