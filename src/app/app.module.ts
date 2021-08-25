import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CommonModule, registerLocaleData} from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {LogInDialog, NavbarComponent} from './components/parts/navbar/navbar.component';
import { FooterComponent } from './components/parts/footer/footer.component';
import { MangaComponent } from './components/manga/manga.component';
import { DetailMangaComponent } from './components/detail-manga/detail-manga.component';
import { ScanComponent } from './components/scan/scan.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { MatBadgeModule } from '@angular/material/badge';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {CollapseModule} from "ngx-bootstrap/collapse";
import {MDBBootstrapModule} from "angular-bootstrap-md";
import { NavbarModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md'
import {MatDialogModule} from "@angular/material/dialog";
import {FlexLayoutModule} from '@angular/flex-layout';
import {ToastrModule} from "ngx-toastr";
import { BibliothequeComponent } from './components/userAccount/bibliotheque/bibliotheque.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {ConfirmDialogComponent} from "./components/userAccount/confirm-dialog/confirm-dialog.component";
import {TranslateModule} from "@ngx-translate/core";
import {JwtModule} from "@auth0/angular-jwt";
import {AuthenticatorGuardService} from "./guards/authenticator.guard";
import {authInterceptorProviders} from "./_helpers/authenticator.interceptor";
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import {MonProfilComponent, UploadFiles} from './components/userAccount/mon-profil/mon-profil.component';
import {MatFileUploadModule} from "angular-material-fileupload";
import localFr from '@angular/common/locales/fr'
import {RatingModule} from "ng-starrating";
import { DragScrollModule } from 'ngx-drag-scroll';
import { ListLastScanComponent } from './components/parts/list-last-scan/list-last-scan.component';
import { HomeComponent } from './components/home/home.component';
import { LectureHomeComponent } from './components/lecture-home/lecture-home.component';
import { UploadNewScanComponent } from './components/admin/upload-new-scan/upload-new-scan.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {
  RECAPTCHA_LANGUAGE,
  RECAPTCHA_SETTINGS,
  RECAPTCHA_V3_SITE_KEY,
  RecaptchaSettings,
  RecaptchaV3Module,
  RecaptchaModule,
  RecaptchaFormsModule
} from "ng-recaptcha";

registerLocaleData(localFr, 'fr');

export function getToken() {
  return localStorage.getItem('auth-token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    MangaComponent,
    DetailMangaComponent,
    ScanComponent,
    LogInDialog,
    BibliothequeComponent,
    ConfirmDialogComponent,
    ForgotPasswordComponent,
    MonProfilComponent,
    UploadFiles,
    ListLastScanComponent,
    HomeComponent,
    LectureHomeComponent,
    UploadNewScanComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
    MatIconModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    MatExpansionModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatTreeModule,
    MatDialogModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    NavbarModule,
    WavesModule,
    ButtonsModule,
    FlexLayoutModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot(),
    JwtModule.forRoot({ config: {
        tokenGetter: getToken
      }}),
    MatFileUploadModule,
    RatingModule,
    DragScrollModule,
    RecaptchaV3Module,
    RecaptchaModule,
    RecaptchaFormsModule,
    ScrollingModule
  ],
  providers: [
    AuthenticatorGuardService,
    authInterceptorProviders,
    {provide: LOCALE_ID, useValue: "fr-FR"},
    {provide: RECAPTCHA_V3_SITE_KEY, useValue: "6Ld82QwcAAAAABrM-jfqi9x9sg_oVOy3tU1A3xcl"},
    {provide: RECAPTCHA_SETTINGS, useValue: { siteKey: "6Ld82QwcAAAAABrM-jfqi9x9sg_oVOy3tU1A3xcl"} as RecaptchaSettings},
    {provide: RECAPTCHA_LANGUAGE, useValue: "fr"}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
