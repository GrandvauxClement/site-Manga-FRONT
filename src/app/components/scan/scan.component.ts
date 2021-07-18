import { Component, OnInit } from '@angular/core';
import {Scan} from "../../models/scan";
import {Manga} from "../../models/manga";
import {MangaService} from "../../services/manga.service";
import {ActivatedRoute, Router} from "@angular/router";

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
  selected: number;
  constructor(private mangaService: MangaService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.nameManga = this.route.snapshot.paramMap.get('manga');
    this.idScan = +this.route.snapshot.paramMap.get('id');
    this.mangaService.getScanById(this.idScan).subscribe((data ) => {
      this.scan = data;
      console.log(this.scan);
      this.selected = this.scan.numero;
      console.log('selected : ' + this.selected);
      this.mangaService.getManga(this.scan.manga).subscribe((dataBis) => {
        this.manga = dataBis;
        console.log(this.manga);
        this.mangaService.getScanByMangaId(this.manga.id).subscribe((dataThird) => {
          this.allScan = dataThird;
          console.log('je passe ici' + dataThird);
          this.isLoading = false;
        })
      })
    })
  }

  Redirect(numeroScan) {
    console.log('je suis ICI !!');
    this.mangaService.getScanByNameAndNumScan(numeroScan, this.manga.name).subscribe( (newScan) => {
      this.idNextScan = newScan.id;
      this.scan = newScan;
      this.countPage = 0;
      //  window.location.href = 'http://localhost:4200/#/read-scan/' + this.idNextScan + '/' + this.manga.nameDirectoryOfScan + '/' + numeroScan ;
      this.router.navigate(['read-scan', this.idNextScan, this.manga.nameDirectoryOfScan, numeroScan]);
      //   ['/read-scan',scanTitle.id, manga.nameDirectoryOfScan, scanTitle.numero]
    })
  }
}
