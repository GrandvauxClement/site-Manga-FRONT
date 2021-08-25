import { Component, OnInit } from '@angular/core';
import {Scan} from "../../models/scan";
import {Manga} from "../../models/manga";
import {MangaService} from "../../services/manga.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {
  countPage = 0;
  isLoading = false;
  nameManga: string;
  idScan: number;
  idNextScan: number;
  scan: Scan;
  manga: Manga;
  allScan: Scan[];
  user: User;
  selected: number;
  userForStats ;
  constructor(private mangaService: MangaService, private route: ActivatedRoute, private router: Router, private userService: UserService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.user = this.tokenStorage.getUser();
    this.nameManga = this.route.snapshot.paramMap.get('manga');
    this.idScan = +this.route.snapshot.paramMap.get('id');
    this.mangaService.getScanById(this.idScan).subscribe((data ) => {
      this.scan = data;
      this.selected = this.scan.numero;
      this.mangaService.getManga(this.scan.manga).subscribe((dataBis) => {
        this.manga = dataBis;
        this.mangaService.getScanByMangaId(this.manga.id).subscribe((dataThird) => {
          this.allScan = dataThird;
          if (this.user == null){
            this.userForStats = null;
          }else {
            this.userForStats = this.user.id;
          }
          this.userService.statsCountMangaRead(this.userForStats, this.idScan).subscribe( then => {
            this.isLoading = false;
          });
        })
      })
    })
  }

  Redirect(numeroScan) {
    this.mangaService.getScanByNameAndNumScan(numeroScan, this.manga.name).subscribe( (newScan) => {

      this.idNextScan = newScan.id;
      this.scan = newScan;
      this.countPage = 0;
      this.selected = newScan.numero;
      if (this.user != null) {
        this.userService.statsCountMangaRead(this.user.id, this.idScan).subscribe( then => {
          this.router.navigate(['read-scan', this.idNextScan, this.manga.nameDirectoryOfScan, numeroScan]);
        });
      } else {
        this.router.navigate(['read-scan', this.idNextScan, this.manga.nameDirectoryOfScan, numeroScan]);
      }
    })
  }
}
