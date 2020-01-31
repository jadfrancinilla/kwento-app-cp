import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ForgotPassword } from '../classes/forgot-password';
import { AccountService } from '../services/account.service';
import { finalize } from 'rxjs/operators'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  showError: boolean;
  error: string;
  token: string;
  email: string;
  isProcessing: boolean;
  
  constructor(private router: Router, private route: ActivatedRoute, private accountService: AccountService) { }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token');
    this.email = this.route.snapshot.queryParamMap.get('email');
  }

  displayValidationErrors(err){

  }

  displayError(err){
    this.showError = true;
    this.error = "Could not change your password. Please try again later.";
  }

  onSubmit(f: NgForm) {
    if(this.isProcessing) return;
    this.isProcessing = true;

    let formValues = f.value;
    let forgotPasswordCredentials = new ForgotPassword();

    forgotPasswordCredentials.password = formValues.password;
    forgotPasswordCredentials.confirm_password = formValues.confirmPassword;
    forgotPasswordCredentials.token = this.token;
    forgotPasswordCredentials.email_address = this.email;

    if(forgotPasswordCredentials.password === forgotPasswordCredentials.confirm_password){
      this.accountService.changePassword(forgotPasswordCredentials)
      .pipe( finalize( () => {
        this.isProcessing = false;
      }))
      .subscribe((res: object) => {
        this.router.navigate(['/success']);
      }, (error: any) => {
        this.displayError(error);        
      });
    }
    else{
      this.isProcessing = false;
      return;
    }
  }
}
