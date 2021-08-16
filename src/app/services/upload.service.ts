import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  apiUrl = 'http://127.0.0.1:8000';
  httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  upload(formData, userId) {
    return this.http.post<any>(this.apiUrl + '/userAccount/monProfil/changeAvatar/' + userId, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  changeAvatarByDefaultImage(userId, name) {
    return this.http.post<any>(this.apiUrl + '/userAccount/monProfil/changeAvatarByDefaultImage', {
      userId: userId,
      nameAvatar: name
    })
  }
}
