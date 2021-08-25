import { Component, OnInit } from '@angular/core';
import {MangaService} from "../../../services/manga.service";

@Component({
  selector: 'app-list-last-scan',
  templateUrl: './list-last-scan.component.html',
  styleUrls: ['./list-last-scan.component.css']
})
export class ListLastScanComponent implements OnInit {
  lastScanOrderByDate;
  isLoading: boolean;
  scanLike : Array<any> = [];
  constructor(private mangaService: MangaService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.mangaService.getLastScanOrderByDateAjout().subscribe(data => {
      this.lastScanOrderByDate = data;
      this.isLoading = false;
    })
  }

  addScanLike(idScan) {
    this.mangaService.addLikeForScan(idScan);
  }

  removeScanLike(idScan) {
    this.mangaService.removeLikeForScan(idScan);
  }

}
