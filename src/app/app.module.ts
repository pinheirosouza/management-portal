import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  HTTPListener,
  HTTPStatus,
} from './shared/_services/interceptor/interceptor.service';
const RxJS_Services = [HTTPListener, HTTPStatus];
import { MainComponent } from './main/main.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { TokenInterceptorService } from './shared/_services/token-interceptor/token-interceptor.service';
import { ManageConfigsComponent } from './shared/dialogs/manage-configs/manage-configs.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PermissionLevelComponent } from './shared/components/permission-level/permission-level.component';
import { AlertComponent } from './shared/dialogs/alert/alert.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ManageConfigsComponent,
    PermissionLevelComponent,
    AlertComponent,
    LoaderComponent,
  ],
  imports: [
    Ng2SearchPipeModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        // whitelistedDomains: [
        //   "https://app.anota.ai",
        //   "https://stagingchatbot.herokuapp.com/",
        // ],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    RxJS_Services,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTPListener,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
