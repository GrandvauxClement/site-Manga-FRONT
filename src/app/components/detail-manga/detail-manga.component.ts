import { Component, OnInit } from '@angular/core';
import {MangaService} from "../../services/manga.service";
import {ActivatedRoute} from "@angular/router";
import {Manga} from "../../models/manga";
import {Scan} from "../../models/scan";
import {StarRatingComponent} from "ng-starrating";

@Component({
  selector: 'app-detail-manga',
  templateUrl: './detail-manga.component.html',
  styleUrls: ['./detail-manga.component.css']
})
export class DetailMangaComponent implements OnInit {
  isLoading = false;
  idManga: number;
  manga: Manga;
  scan: Scan[];
  constructor(private mangaService: MangaService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.idManga = +this.route.snapshot.paramMap.get('id');
    this.mangaService.getMangaById(this.idManga).subscribe((data) => {
      this.manga = data;
      console.log(data);
      this.mangaService.getScanByMangaId(this.idManga).subscribe((data) => {
        this.scan = data;
        console.log('je passe ici' + data);
        this.isLoading = false;
      })
    })
  }

  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    this.mangaService.ChangeValueOfNoteOfManag(this.idManga, $event.newValue).subscribe(then => {
      alert(`Old Value:${$event.oldValue},
      New Value: ${$event.newValue},
      Checked Color: ${$event.starRating.checkedcolor},
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
    });

  }

}
