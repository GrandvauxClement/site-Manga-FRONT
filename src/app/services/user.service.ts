import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'http://127.0.0.1:8000';
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

  getUserLikeManga(id): Observable<any>{
    return this.http.get<any>(this.apiUrl + '/mangas/getLikeManga/' + id);
  }

  addNewMangaInLIbrary(userId, mangaId, status, notePerso): Observable<any>{
    return this.http.post<any>(this.apiUrl + '/library/addManga', {
      "userId": userId,
      "manga": mangaId,
      "status": status,
      "notePerso": notePerso
    })
  }

  deleteMangaInLIbraryBYUserId(userId, mangaId): Observable<any>{
    return this.http.delete<any>(this.apiUrl + '/library/deleteManga/' + userId + '/' +mangaId)
  }

  addNewUserLikeManga(userId, mangaId): Observable<any>{
    return this.http.post<any>( this.apiUrl + '/addMangaLikeByUser', {
      "userId": userId,
      "mangaId": mangaId
    })
  }

  deleteUserLikeOfManga(userId, mangaId): Observable<any>{
    return this.http.delete<any>(this.apiUrl + '/mangaLike/deleteManga/' + userId + '/' +mangaId)
  }

  getMangaInLibraryByUserId(userId): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/library/getMangaByUserId/' + userId);
  }

  getMangaInLibraryByUserIdForAccount(userId): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/library/userAccount/getMangaByUserId/' + userId);
  }

  LibraryUserChangeMangaStatus(userId, mangaId, status): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/library/changeStatusManga', {
      "userId": userId,
      "mangaId": mangaId,
      "status": status
    });
  }

  LibraryUserChangeMangaNotePerso(userId, mangaId, notePerso): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/library/changeNotePersoManga', {
      "userId": userId,
      "mangaId": mangaId,
      "notePerso": notePerso
    });
  }

  GetNumberOfLikeAndMangaInLibraryByUserId(userId): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/userAccount/monProfil/countLikeAndBibliotheque/' + userId)
  }

  getUserById(userId): Observable<User> {
    return this.http.get<User>(this.apiUrl + '/getCompleteUserById/' + userId);
  }

}
