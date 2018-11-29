import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthenticationService} from '../auth.service';
import { first } from 'rxjs/operators';
import {AppComponent} from '../app.component';
import {UserService} from '../user.service';
import {Accounts} from '../Accounts';
import { AES } from 'crypto-ts';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  model: any = {};
  message: 'Logged in';
  accounts: Array<Accounts>;
  email;
  password;
  fail = false;

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
  loginUser(form) {
    console.log(form);
    console.log(form.value);

    if(form.value == null)
      form = {value: form};

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
    console.log('ngForm starts')
    console.log(ngForm);
    console.log('ngForm ends')
    let user = new Accounts();
    user.salt = 'notEmpty';
    user.email = ngForm.email;
    user.password = ngForm.password + user.salt;

    var keySize = 256;
    var iterations = 100;

    var message = ngForm.password;
    var password = "Secret Password";


    function encrypt (msg, pass) {
      var salt = CryptoJS.lib.WordArray.random(128/8);
      console.log(salt)

      var key = CryptoJS.PBKDF2(pass, salt, {
        keySize: keySize/32,
        iterations: iterations
      });

      var iv = CryptoJS.lib.WordArray.random(128/8);

      var encrypted = CryptoJS.AES.encrypt(msg, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC

      });

      // salt, iv will be hex 32 in length
      // append them to the ciphertext for use  in decryption
      var transitmessage = salt.toString()+ iv.toString() + encrypted.toString();
      console.log(transitmessage)
      return transitmessage;
    }

    var encrypted = encrypt(message, password);
    console.log(encrypted)
    user.password = encrypted

    this.userService.createUser(user).pipe(first())
      .subscribe(
        res => {

          console.log(res);
          console.log('Sign in user')
          console.log('ngForm starts')
          console.log(ngForm);
          console.log('ngForm ends')
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


