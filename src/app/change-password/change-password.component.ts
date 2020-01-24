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

    console.log(this.email);
    console.log(this.token);
  }

  displayValidationErrors(err){

  }

  displayErrors(err){
    this.showError = true;
    this.error = err.error.Message;
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
      console.log('yes');
      this.accountService.changePassword(forgotPasswordCredentials)
      .pipe( finalize( () => {
        this.isProcessing = false;
      }))
      .subscribe((res: object) => {
        this.router.navigate(['/success']);
      }, (error: any) => {
        console.log(error);
        this.displayErrors(error);        
      });
    }
  }
}
