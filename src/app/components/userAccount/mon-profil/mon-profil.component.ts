import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../models/user";
import {TokenStorageService} from "../../../services/token-storage.service";
import {UserService} from "../../../services/user.service";
import {UploadService} from "../../../services/upload.service";
import {catchError, map} from "rxjs/operators";
import {HttpErrorResponse, HttpEventType} from "@angular/common/http";
import {of} from "rxjs";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ConfirmPasswordValidator} from "../../parts/navbar/confirm-password.validator";

export interface DialogData {
  user: User;
  forgetPassword: boolean;
}

@Component({
  selector: 'app-mon-profil',
  templateUrl: './mon-profil.component.html',
  styleUrls: ['./mon-profil.component.css']
})
export class MonProfilComponent implements OnInit {

  isLoading = false;
  user: User;
  numberOflike: number;
  numberOfMangaInLibrary: number;

  constructor(private tokenStorage: TokenStorageService, private userService: UserService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getUserById(this.tokenStorage.getUser().id).subscribe( data => {
      this.user = data;

      this.userService.GetNumberOfLikeAndMangaInLibraryByUserId(this.user.id).subscribe( then => {
        this.numberOflike = then.like;
        this.numberOfMangaInLibrary = then.library;
        this.isLoading = false;
      })
    })

  }



  openDialog() {
    const dialogRef = this.dialog.open(UploadFiles, {
      width: '60vw',
      data : {
        user: this.user,
        forgetPassword: false
      }
    });

    dialogRef.afterClosed().subscribe( result => {
      console.log(`Dialog result: ${result}`);
    })
  }

}

@Component({
  selector: 'dialog-content-upload-file',
  templateUrl: 'upload-file.html',
  styleUrls: ['./mon-profil.component.css']
})
export class UploadFiles implements OnInit {

  formLogIn: FormGroup;
  files : string;
  selectedFile: File = null;
  errorMessage : string = null;
  defaultAvatar = ['ace.jpg', 'gutts.png', 'kid.jpg', 'kilua.jpg', 'livai.jpg', 'luffy.png', 'shanks.jpg', 'shin.jpg'];
  defaultAvatarSelected: number = null;
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<UploadFiles>, @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private authService: AuthenticationService, private tokenStorage: TokenStorageService, private route: Router, private tostr: ToastrService, private uploadService: UploadService,) {
  }

  ngOnInit() {

  }

  onUpload(event) {
    const uploadData = new FormData();
    this.selectedFile = event.target.files[0] as File;
    uploadData.append('images', this.selectedFile, this.selectedFile.name);
    this.uploadService.upload(uploadData, this.data.user.id).subscribe( (event: any) =>{
      switch (event.type) {
        case 4:
          this.data.user.avatar = event.body.file;
          break;
        default :
          break;
      }
    }, err => {
      this.errorMessage = err.error.message;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

