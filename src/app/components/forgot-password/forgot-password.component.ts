import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {ConfirmPasswordValidator} from "../parts/navbar/confirm-password.validator";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  token: string;
  formResetPassword: FormGroup;
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private auth: AuthenticationService, private tostr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    this.formResetPassword = this.fb.group({
      password: ['', [Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{6,}$')]],
      passwordConfirm: ['', []]
    }, {
      validator: ConfirmPasswordValidator.MatchPassword
    });
  }

  onSubmit() {
    this.auth.resetPassword(this.token, this.formResetPassword.value.password).subscribe( then =>{
      this.tostr.success('Mot de passe modifié avec succès');
      this.router.navigate(['/home']);
      }, err =>{
        this.tostr.error('Renouveller votre demande d\'un nouveau mot de passe', 'Erreur : Votre lien a expiré',{
          disableTimeOut: true,
        });
      }

    )
  }

}
