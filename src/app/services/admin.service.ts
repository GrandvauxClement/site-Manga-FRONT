import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
 // apiUrl = 'http://127.0.0.1:8000';
  apiUrl = 'https://www.apiback.mangatheques.fr'
  httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  CrawleruploadNewScan(): Observable<any>{
    return this.http.get(this.apiUrl + '/crawler/scan-manga/updateDB');
  }

  readCsvMangaInfoForUploadNewScan(): Observable<any> {
    return this.http.get(this.apiUrl + '/csv/reader/mangaInfo')
  }
}
