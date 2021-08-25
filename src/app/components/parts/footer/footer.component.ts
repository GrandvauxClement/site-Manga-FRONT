import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/user";
import {TokenStorageService} from "../../../services/token-storage.service";
import {UserService} from "../../../services/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  formContactUs: FormGroup;
  user: User;
  constructor(private fb: FormBuilder, private tokenStorage: TokenStorageService, private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.formContactUs = this.fb.group({
      email: ['', [Validators.email]],
      message: ['', [Validators.required]]
    });
    this.user = this.tokenStorage.getUser();
  }

  submit() {
    this.userService.postMessageContactUs(this.user.id, this.formContactUs.value.email, this.formContactUs.value.message).subscribe( then => {
      this.toastr.success('Votre message a été envoyé', 'Réussite');
    })
  }

  resolved(catchaResponse: string) {
    console.log('Resolved captcha with response: ${captchaResponse}');
  }

  errored() {
    console.warn('reCAPTCHA error encountered');
  }
}
