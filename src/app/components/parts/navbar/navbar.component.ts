import {Component, ElementRef, HostListener, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../services/authentication.service';
import {TokenStorageService} from '../../../services/token-storage.service';
import {Router} from '@angular/router';
import {User} from '../../../models/user';
import {MangaService} from '../../../services/manga.service';
import {ConfirmPasswordValidator} from './confirm-password.validator';
import {ToastrService} from "ngx-toastr";
import {randomInt} from "crypto";

export interface DialogData {
  asLogin: boolean;
  forgetPassword: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User;
  formSearch: FormGroup;
  search: Array<any>;
  searchDataActive: boolean;
  value = '';
  text: String;
  isCollapsed: boolean;
  selectedItem = 0;
  arrayImageHeader : Array<any> = ['hunter-x-hunter-anime.jpg','naruto.jpg','one-piece-anime.jpg','shingeki-no-kyojin-anime.jpg','toji-no-miko-anime.jpg','00454d362b96b28e9438d818161522d1.jpg'];
  imageHeaderSelected;
  screenWidth: number = 60;
  dialogScreenAdepted: boolean = false;
  constructor(public dialog: MatDialog, private tokenStorage: TokenStorageService, private fb: FormBuilder,
              private mangaService: MangaService, private eRef: ElementRef) {
    this.text = 'no clicks yet';
  }

  ngOnInit(): void {
    this.imageHeaderSelected = 'background-image: url(http://127.0.0.1:8000/header/' + this.arrayImageHeader[Math.floor(Math.random() * 6)] + ')';
    this.user = this.tokenStorage.getUser();
    this.isCollapsed = true;
    this.screenWidth = window.screen.width
    if (window.screen.width < 500){
      this.screenWidth = 80;
    }
    this.formSearch = this.fb.group({
      search: [this.search, []],
    });
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if ( this.eRef.nativeElement.contains(event.target)) {
      this.text = 'clicked inside';
      console.log(this.isCollapsed + ' is collapsed');
    } else {
      this.text = 'clicked outside';
      this.search = null;
      this.searchDataActive = null;
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(LogInDialog, {
      width: this.screenWidth + 'vw',
      data : {
        asLogin: true,
        forgetPassword: false
      }
    });

    dialogRef.afterClosed().subscribe( result => {
      console.log(`Dialog result: ${result}`);
    })
  }

  logout() {
    this.tokenStorage.logOut();
    window.location.reload();
  }

  searchBar() {
    console.log(this.formSearch.value.search);
    if (this.formSearch.value.search.length > 2) {
      this.mangaService.searchBar(this.formSearch.value.search).subscribe( data => {
        console.log(data);
        if (data == false){
          this.searchDataActive = false;
        } else {
          this.searchDataActive = true;
          this.search = data;
        }

      })
    }
  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'logIn-dialog.html',
})
export class LogInDialog implements OnInit {
  // email: string;
  password: string;
  pseudo: string;
  formLogIn: FormGroup;
  formRegister: FormGroup;
  formForgetPassword: FormGroup;
  messageError = null;
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<LogInDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private authService: AuthenticationService, private tokenStorage: TokenStorageService, private route: Router, private tostr: ToastrService) {
  }

  ngOnInit() {
    this.formLogIn = this.fb.group({
      email: ['', [Validators.email]],
      password: [this.password, []],
    });
    this.formRegister = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{6,}$')
      ])],
      passwordConfirm: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{6,}$'),
      ])],
      pseudo: [this.pseudo, []]
    }, {
      validator: ConfirmPasswordValidator.MatchPassword
    });
    this.formForgetPassword = this.fb.group({
      email: ['', [Validators.email]]
    });
  }

  login() {
    console.log('hERE je suis here' + this.formLogIn.value.email + '  ' + this.formLogIn.value.password);
    this.authService.logIn(this.formLogIn.value.email, this.formLogIn.value.password).subscribe( then => {
      console.log('after login ' + then);
      this.tokenStorage.saveToken(then.token);
      this.authService.saveUser(then.token).subscribe( dataUser => {
        this.tokenStorage.saveUser(dataUser);
        this.dialogRef.close(this.formLogIn.value);
        window.location.reload();
      })
    },
      err => {
      console.log('je passe dans error ' + err.error.message)
        this.tostr.error('Mauvais email / Mot de passe','Erreur', {
          disableTimeOut: true,
        });
      })
  }

  register() {
    console.log('Pret a me créer un compte' + this.formRegister.value);
    this.authService.register(this.formRegister.value.email, this.formRegister.value.password, this.formRegister.value.pseudo).subscribe( then => {
      console.log(then);
      if (then.error){
        this.tostr.error(then.error,'Erreur', {
          disableTimeOut: true,
        });
      }else {
        this.tostr.success(then.success,' Réussite');
        this.authService.logIn(this.formRegister.value.email, this.formRegister.value.password).subscribe( then => {
          this.tokenStorage.saveToken(then.token);
          this.authService.saveUser(then.token).subscribe( dataUser => {

            this.tokenStorage.saveUser(dataUser);
            this.dialogRef.close(this.formRegister.value);
            window.location.reload();
          })
        })

      }
    //TODO back renvoye token after connect
    })

  }

  forgetPassword(){
    this.authService.checkIfUserExistByEmail(this.formForgetPassword.value.email).subscribe( data => {
      console.log('Response UserIfExist '+data);
      if (data == true){
        this.authService.forgetPassword(this.formForgetPassword.value.email).subscribe( then => {
          this.tostr.success('L\'Email a bien été envoyé','Réussite', {
            disableTimeOut: true,
          });
        }, err =>{
          console.log(err);
          this.tostr.error('Cet email est associé a aucun compte','Erreur, Réessayer', {
            disableTimeOut: true,
          });
        })
      } else {
        this.tostr.error('Cet email est associé a aucun compte','Erreur, Réessayer', {
          disableTimeOut: true,
        });
      }
    })

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  isControlHasError(controlName: string, validationType: string): boolean {

    const control = this.formRegister.controls[controlName];
    console.log(control);
    if (!control) {
      return false;
    }

    return control.hasError(validationType) && (control.dirty || control.touched);
  }

}
