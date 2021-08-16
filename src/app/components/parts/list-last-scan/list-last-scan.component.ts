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
    console.log(this.scanLike+ ' : scanLike')
    this.mangaService.addLikeForScan(idScan).subscribe( data => {
      console.log(data + ' la data');
      }

    );
  }

  removeScanLike(idScan) {
    this.mangaService.removeLikeForScan(idScan);
  }

}
