import { Component, OnInit } from '@angular/core';
import {Manga} from "../../models/manga";
import {MangaService} from "../../services/manga.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import {LogInDialog} from "../parts/navbar/navbar.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-manga',
  templateUrl: './manga.component.html',
  styleUrls: ['./manga.component.css']
})
export class MangaComponent implements OnInit {
  manga: Manga[];
  isLoading = false;
  paginator;
  filterType = ['Tous Types', 'Manga', 'Anime'];
  filterTypeSelected = this.filterType[0];
  filterStyle = ['Tous Styles', 'Shônen', 'Seinen', 'Shôjo', 'Josei'];
  filterStyleSelected = this.filterStyle[0];
  filterGenre: Array<any>;
  filterGenreSelected: string;
  type: string;
  genre: string;
  style: string;
  letter: string;
  alphabet = ['Aucun Tri', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  letterSelected: string;
  user: User;
  userLike;
  mangaInLibrary;
  haveQueryParams = false;
  constructor(private mangaService: MangaService, private tokenStorage: TokenStorageService, private userService: UserService, private toastr: ToastrService,
              private activatedRoute: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.user = this.tokenStorage.getUser();

    this.letterSelected = 'Aucun Tri';
    if ( this.user != null){
      this.userService.getUserLikeManga(this.user.id).subscribe((userLike) => {
        this.userLike = userLike;
      })
      this.userService.getMangaInLibraryByUserId(this.user.id).subscribe((mangaLibrary => {
        this.mangaInLibrary = mangaLibrary;
      }))
    }
    this.mangaService.getManga().subscribe((data) => {
      this.manga = data['hydra:member'];
      this.paginator = data['hydra:view'];
      this.mangaService.getAllGenreForFilterBar().subscribe( (genre => {
        this.filterGenre = genre;
        this.filterGenreSelected = genre[0];
        if (this.activatedRoute.snapshot.queryParamMap.get('genre') != null) {
          this.filterGenreSelected = this.activatedRoute.snapshot.queryParamMap.get('genre');
          this.haveQueryParams = true;
        }
        if (this.activatedRoute.snapshot.queryParamMap.get('style') != null) {
          this.filterStyleSelected = this.activatedRoute.snapshot.queryParamMap.get('style');
          this.haveQueryParams = true;
        }
        if (this.activatedRoute.snapshot.queryParamMap.get('type') != null) {
          this.filterTypeSelected = this.activatedRoute.snapshot.queryParamMap.get('type');
          this.haveQueryParams = true;
        }
        if (this.haveQueryParams){
          this.FilterBarSearch();
        }
        this.isLoading = false ;
      }))
    })

  }

  MangaPaginator(apiUrl) {
    this.isLoading = true;
    return this.mangaService.getManga(apiUrl).subscribe((data => {
      this.manga = data['hydra:member'];
      this.paginator = data['hydra:view'];
      this.isLoading = false;
    }))
  }

  FilterBarSearch() {
    if (this.filterTypeSelected === 'Tous Types') {
      this.type = null;
    } else {
      this.type = this.filterTypeSelected;
    }
    if (this.filterStyleSelected === 'Tous Styles') {
      this.style = null;
    } else {
      this.style = this.filterStyleSelected;
    }
    if (this.filterGenreSelected === 'Tous Genres') {
      this.genre = null;
    } else {
      this.genre = this.filterGenreSelected;
    }
    this.mangaService.getMangaByFilterBar(this.type, this.style, this.genre, this.letter).subscribe((manga => {
      this.manga = manga['hydra:member'];
      this.paginator = manga['hydra:view'];
    }));
  }

  FilterByLetter(letter) {
    if (letter === 'Aucun Tri') {
      this.letter = null;
    } else {

      this.letter = letter;
    }
    this.letterSelected = letter;
    this.FilterBarSearch();
  }

  AddInLibraryManga(manga) {
    this.userService.addNewMangaInLIbrary(this.user.id, manga.id, 'A Definir', null).subscribe((library => {
      this.toastr.success('a bien été ajouter à votre bibliothèque' , 'Réussite: ' + manga.name)
    }))
  }

  AddInMangaLike(idManga) {
    this.userService.addNewUserLikeManga(this.user.id, idManga).subscribe((library => {

    }))
  }

  DeleteMangaInLibrary(manga) {
    this.userService.deleteMangaInLIbraryBYUserId( this.user.id, manga.id).subscribe((deleteLibrary => {
      this.toastr.error('a bien été supprimer de votre bibliothèque' , 'Réussite: ' + manga.name)
    }))
  }

  DeleteUserLikeOfManga(manga) {
    this.userService.deleteUserLikeOfManga( this.user.id, manga.id).subscribe((deleteMangaLike => {

    }))
  }

  onClose(event: any){
  }

  openDialog() {
    const dialogRef = this.dialog.open(LogInDialog, {
      width: '60vw',
      data : {asLogin: true}
    });

    dialogRef.afterClosed().subscribe( result => {
      console.log(`Dialog result: ${result}`);
    })
  }
}
