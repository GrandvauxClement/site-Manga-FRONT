import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {User} from "../../../models/user";
import {TokenStorageService} from "../../../services/token-storage.service";
import {UserService} from "../../../services/user.service";
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {Library} from "../../../models/library";
import { Subscription } from 'rxjs';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import {ToastrModule, ToastrService} from "ngx-toastr";
import {MangaService} from "../../../services/manga.service";
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-bibliotheque',
  templateUrl: './bibliotheque.component.html',
  styleUrls: ['./bibliotheque.component.css']
})
export class BibliothequeComponent implements OnInit {
  displayedColumns: string[] = ['Nom Manga', 'Image', 'Status', 'Note Perso', 'Actions'];
  user: User;
  dataSource = new MatTableDataSource<Library>();
  selection = new SelectionModel<Library>(true, []);
  data = Object.assign(Library);
  currentScreenWidth = '';
  flexMediaWatcher: Subscription;
  result: string = '';
  isLoading = false;
  sortedData: Library[];
  arrayOfAllStatus = ['A Definir','A Lire','A regarder', 'En attente de la suite'];
  screenWidthIsPhone = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
 // @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private tokenStorage: TokenStorageService, private userService: UserService, private mediaObserver: MediaObserver, public dialog: MatDialog,
              private toastr: ToastrService, private mangaService: MangaService) {
    this.flexMediaWatcher = mediaObserver.media$.subscribe((change: MediaChange) => {
      this.currentScreenWidth = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
      if ( change.mqAlias == 'xs') {
        this.setupTable();
      }
    });
  }

  ngOnInit(): void {
    this.isLoading = true ;
    this.user = this.tokenStorage.getUser();
    if (window.screen.width === 360) { // 768px portrait
      this.screenWidthIsPhone = true;
    }
    this.userService.getMangaInLibraryByUserIdForAccount(this.user.id).subscribe( data => {
    //  this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = data;
      this.isLoading = false;
    /*  this.dataSource.data.forEach((dataDetail, index)=>{
        this.mangaService.getOneMangaByURlApi(dataDetail.manga).subscribe( mangaData => {
          console.log('avant : ' + this.dataSource.data[index].manga);
          this.dataSource.data[index].manga = mangaData;
          console.log('après : ' + this.dataSource.data[index].manga);
          if (index+1 == this.dataSource.data.length){
            console.log('je passe dans issLoading à index :' + index);

          }
        })
        console.log('index: ' + index + 'length: ' + this.dataSource.data.length)
      })*/
    })

  }

  setupTable() {
    if (window.screen.width <= 420) {
      this.displayedColumns = ['Nom Manga', 'Status', 'Note Perso', 'Actions'];
    } else {
      this.displayedColumns = ['Nom Manga', 'Image', 'Status', 'Note Perso', 'Actions'];
    }
  };

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Library): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  /** Search Filter */
  applyFilter(filterValue: string) {
    console.log('applyFilter: '+ filterValue );
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  removeSelectedRows(selectedUser: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: selectedUser
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true){
        this.isLoading = true;
        const token = this.tokenStorage.getToken();

        this.selection.selected.forEach(item => {
          this.userService.deleteMangaInLIbraryBYUserId(this.user.id, item).subscribe((data: Library) => {
            this.userService.getMangaInLibraryByUserIdForAccount(this.user.id).subscribe( data => {
            //  this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
              this.dataSource.data = data['hydra:member'];
              this.toastr.success('Le manga a bien été supprimé.', 'Réussite');
              this.selection.clear();
              this.isLoading = false;
            });
          });
        });
      }
    });

  }

  confirmDialog(Manga): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: Manga
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true){
        this.isLoading = true;
        this.userService.deleteMangaInLIbraryBYUserId(this.user.id, Manga.id).subscribe((data: Library) => {
          this.userService.getMangaInLibraryByUserIdForAccount(this.user.id).subscribe( data => {
       //     this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.dataSource.data = data['hydra:member'];
            this.toastr.success('Le manga a bien été supprimé.', 'Réussite');
            this.selection.clear();
            this.isLoading = false;
          });
        });
      }
    });
  }
  ngOnDestroy() {
    this.flexMediaWatcher.unsubscribe();
  }

  DeleteMangaInLibrary(manga) {
    this.userService.deleteMangaInLIbraryBYUserId( this.user.id, manga.id).subscribe((deleteLibrary => {
      this.toastr.error('a bien été supprimer de votre bibliothèque' , 'Réussite: ' + manga.name)
    }))
  }

  onClose(event: any){
    console.log(event);
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();

    if (!sort.active || sort.direction === '') {
      console.log('je passe ici : ' + data);
      this.sortedData = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Nom Manga': return compare(a.manga.name, b.manga.name, isAsc);
        /*case 'calories': return compare(a.calories, b.calories, isAsc);
        case 'fat': return compare(a.fat, b.fat, isAsc);
        case 'carbs': return compare(a.carbs, b.carbs, isAsc);
        case 'protein': return compare(a.protein, b.protein, isAsc);*/
        default: return 0;
      }
    });
  }

  ChangeStatusManga(status, mangaId) {
    console.log('Je passe dans status : ' + status);
    this.userService.LibraryUserChangeMangaStatus(this.user.id, mangaId, status).subscribe((response => {
      console.log(response);
    }))
  }

  ChangeNotePersoManga(notePerso, mangaId) {
    console.log('notePerso :' + notePerso);
    console.log('mangaId :' + mangaId);
    this.userService.LibraryUserChangeMangaNotePerso(this.user.id, mangaId, notePerso).subscribe((response => {
      console.log(response);
    }))
  }

}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  console.log('compare a : ' + a);
  console.log('compare b : ' + b);
  console.log('compare isAsc : ' + isAsc);
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
