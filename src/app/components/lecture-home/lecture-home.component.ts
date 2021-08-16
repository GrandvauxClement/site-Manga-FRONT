import { Component, OnInit } from '@angular/core';
import {MangaService} from "../../services/manga.service";

@Component({
  selector: 'app-lecture-home',
  templateUrl: './lecture-home.component.html',
  styleUrls: ['./lecture-home.component.css']
})
export class LectureHomeComponent implements OnInit {

  nameMangaOfScan;
  isLoading: boolean;
  scanLike : Array<any> = [];
  constructor(private mangaService: MangaService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.mangaService.getAllMangaWhoHaveScan().subscribe(data => {
      this.nameMangaOfScan = data;
      this.isLoading = false;
    })
  }

  addScanLike(idScan) {
    this.mangaService.addLikeForScan(idScan).subscribe( data => {
      }
    );
  }

  removeScanLike(idScan) {
    this.mangaService.removeLikeForScan(idScan);
  }

}
