import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {AuthenticationService} from '../auth.service';
import { first } from 'rxjs/operators';
import {AppComponent} from '../app.component';
import {UserService} from '../user.service';
import {Accounts} from '../Accounts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  message: 'Logged in';
  accounts: Array<Accounts>;
  email;
  password;
  fail: boolean = false;

  // Event Emmiter to pass data to app component
  @Output() messageEvent = new EventEmitter<string>();

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private appComp: AppComponent,
    private userService: UserService
  ) {}

  ngOnInit() {
      this.userService.getUsers().pipe(first()).subscribe(res => this.accounts = res);
  }

  // Call to the Login Rest API to get a Token
  loginUser(form: NgForm) {
    console.log(form.value);

    // Calling the authentication service
    this.authenticationService.login(form.value.email, form.value.password).pipe(first())
      .subscribe(
        res => {
          console.log(res);

          // Event message to update state of login
          this.sendMessage();
          this.appComp.receiveMessage(res);
          this.fail = true;
        },
        err => {
          console.log(err.message);
          console.log('Login Failed');
          this.fail = true;
        }
      );
  }


  onSubmit(ngForm) {
    console.log(ngForm);
    let user = new Accounts();
    user.email = ngForm.newEmail;
    user.password = ngForm.newPassword;
    this.userService.createUser(user).pipe(first())
      .subscribe(
        res => {

          console.log(res);
          this.loginUser(ngForm);
        },
        err => {
          console.log(err.message);
          console.log('Login Failed');
        }
      );
  }

  // Sends an event to inform the main app component that a user is logged in
  sendMessage() {
    this.messageEvent.emit(this.message);

  }
}


