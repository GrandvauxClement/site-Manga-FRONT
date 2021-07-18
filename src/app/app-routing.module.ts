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

const routes: Routes = [
  {path: 'home', component: MangaComponent},
  {path: 'manga', component: MangaComponent},
  {path: 'manga-detail/:id', component: DetailMangaComponent},
  {path: 'read-scan/:id/:manga/:numero', component: ScanComponent},
  {path: 'forgot-password/:token', component: ForgotPasswordComponent},
  {path: 'maBibiliotheque', component: BibliothequeComponent, canActivate: [AuthenticatorGuardService]},
  {path: 'monProfil', component: MonProfilComponent, canActivate: [AuthenticatorGuardService]},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
     useHash: true
  })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
