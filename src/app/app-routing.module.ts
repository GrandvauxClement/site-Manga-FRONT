import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import {MangaComponent} from "./components/manga/manga.component";
import {DetailMangaComponent} from "./components/detail-manga/detail-manga.component";
import {ScanComponent} from "./components/scan/scan.component";
import {BibliothequeComponent} from "./components/userAccount/bibliotheque/bibliotheque.component";
import {AuthenticatorGuardService} from "./guards/authenticator.guard";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {MonProfilComponent} from "./components/userAccount/mon-profil/mon-profil.component";
import {HomeComponent} from "./components/home/home.component";
import {LectureHomeComponent} from "./components/lecture-home/lecture-home.component";
import {UploadNewScanComponent} from "./components/admin/upload-new-scan/upload-new-scan.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'manga', component: MangaComponent},
  {path: 'lecture-home', component: LectureHomeComponent},
  {path: 'manga-detail/:id', component: DetailMangaComponent, runGuardsAndResolvers: 'always'},
  {path: 'read-scan/:id/:manga/:numero', component: ScanComponent},
  {path: 'forgot-password/:token', component: ForgotPasswordComponent},
  {path: 'maBibiliotheque', component: BibliothequeComponent, canActivate: [AuthenticatorGuardService]},
  {path: 'monProfil', component: MonProfilComponent, canActivate: [AuthenticatorGuardService]},
  {path: 'admin', component: UploadNewScanComponent, canActivate: [AuthenticatorGuardService]},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
     useHash: true,
     onSameUrlNavigation: 'reload'
  })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
