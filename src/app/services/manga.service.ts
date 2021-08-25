import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Manga} from '../models/manga';
import {Scan} from '../models/scan';

@Injectable({
  providedIn: 'root'
})
export class MangaService {
 // apiUrl = 'http://127.0.0.1:8000';
  apiUrl = 'https://www.apiback.mangatheques.fr'
  httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type': 'application/json'
    })
  };

  constructor( private http: HttpClient) { }
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      errorMessage = 'Error Code: ${error.status}\nMessage: ${error.message}';
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getManga(apiUrlRecu?): Observable<any> {
    if (apiUrlRecu == null) {
      return this.http.get<Manga[]>( this.apiUrl + '/api/mangas');
    } else {
      return this.http.get<Manga[]>( this.apiUrl + apiUrlRecu);
    }

  }

  getMangaById(idManga: number): Observable<Manga> {
    return this.http.get<Manga>(this.apiUrl + '/api/mangas/' + idManga);
  }

  getOneMangaByURlApi(apiManga: string): Observable<Manga> {
    return this.http.get<Manga>(this.apiUrl + apiManga);
  }

  getScanByMangaId(idManga: number): Observable<Scan[]> {
    return this.http.get<Scan[]>(this.apiUrl + '/api/scanByManga/' + idManga);
  }

  getScanById(idScan: number): Observable<Scan> {
    return this.http.get<Scan>(this.apiUrl + '/api/scans/' + idScan);
  }
  getScanByNameAndNumScan(numScan: number, nameScan: string ): Observable<Scan> {
    return this.http.get<Scan>(this.apiUrl + '/getscanByNumNameManga/' + numScan + '/' + nameScan);
  }

  searchBar(search): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/searchInfo/' + search);
  }

  getAllGenreForFilterBar(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/getAllGenreOfManga')
  }

  getMangaByFilterBar(type, style, genre, letter): Observable<Manga[]> {
    if (letter == null){
      if (type != null && style != null && genre != null) {
        return this.http.get<Manga[]>(this.apiUrl + '/api/mangas?type=' + type + '&style=' + style + '&genre=' + genre);
      } else if (type != null && style != null && genre == null) {
        return this.http.get<Manga[]>(this.apiUrl + '/api/mangas?type=' + type + '&style=' + style);
      } else if (type != null && style == null && genre != null) {
        return this.http.get<Manga[]>(this.apiUrl + '/api/mangas?type=' + type + '&genre=' + genre);
      } else if (type == null && style != null && genre != null) {
        return this.http.get<Manga[]>(this.apiUrl + '/api/mangas?style=' + style + '&genre=' + genre);
      } else if ( type != null && style == null && genre == null) {
        return this.http.get<Manga[]>(this.apiUrl + '/api/mangas?type=' + type );
      } else if ( type == null && style != null && genre == null) {
        return this.http.get<Manga[]>(this.apiUrl + '/api/mangas?style=' + style );
      } else if ( type == null && style == null && genre != null) {
        return this.http.get<Manga[]>(this.apiUrl + '/api/mangas?genre=' + genre );
      } else if ( type == null && style == null && genre == null) {
        return this.http.get<Manga[]>(this.apiUrl + '/api/mangas');
      }
    } else {
      if (type != null && style != null && genre != null) {
        return this.http.get<Manga[]>(this.apiUrl + '/api/mangas?type=' + type + '&style=' + style + '&genre=' + genre + '&name=' + letter);
      } else if (type != null && style != null && genre == null) {
        return this.http.get<Manga[]>(this.apiUrl + '/api/mangas?type=' + type + '&style=' + style + '&name=' + letter);
      } else if (type != null && style == null && genre != null) {
        return this.http.get<Manga[]>(this.apiUrl + '/api/mangas?type=' + type + '&genre=' + genre + '&name=' + letter);
      } else if (type == null && style != null && genre != null) {
        return this.http.get<Manga[]>(this.apiUrl + '/api/mangas?style=' + style + '&genre=' + genre + '&name=' + letter);
      } else if ( type != null && style == null && genre == null) {
        return this.http.get<Manga[]>(this.apiUrl + '/api/mangas?type=' + type + '&name=' + letter);
      } else if ( type == null && style != null && genre == null) {
        return this.http.get<Manga[]>(this.apiUrl + '/api/mangas?style=' + style + '&name=' + letter);
      } else if ( type == null && style == null && genre != null) {
        return this.http.get<Manga[]>(this.apiUrl + '/api/mangas?genre=' + genre + '&name=' + letter);
      } else if ( type == null && style == null && genre == null) {
        return this.http.get<Manga[]>(this.apiUrl + '/api/mangas?name=' + letter);
      }
    }

  }
  ChangeValueOfNoteOfManag(mangaId, note): Observable<any> {
    return this.http.post(this.apiUrl + '/api/manga/changeNote', {
      mangaId: mangaId,
      note: note
    });
  }

  getLastScanOrderByDateAjout(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/api/scan/getScanOrderByDateAjout');
  }

  addLikeForScan(scanId): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/api/scan/addLike/' + scanId, {});
  }

  removeLikeForScan(scanId): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/api/scan/removeLike/' + scanId, {});
  }

  getAllMangaWhoHaveScan(): Observable<any> {
    return this.http.get(this.apiUrl + '/api/scan/getMangaWhoHaveScan');
  }


}
