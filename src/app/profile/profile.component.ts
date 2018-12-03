import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {AuthenticationService} from '../auth.service';
import {first} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {Accounts} from '../Accounts';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 response: any;
 email;
 user : Accounts;
 userImage;

  constructor(private userService: UserService,
              private  authService: AuthenticationService,
              private http: HttpClient
    ) { }

  ngOnInit() {
    this.authService.verifyUser().pipe(first()).subscribe(res => {
      if(this.user) {
        this.user.firstname = '';
        this.user.lastname = '';
        this.user.image = '';
      }
      this.response = res;
      this.email = this.response.decoded.email;
      console.log(this.response);
      console.log(this.email);
      this.loadUserProfile();
    });
  }

  loadUserProfile(){
    this.userService.getUser(this.email).pipe(first()).subscribe(res => {
      this.user = res;
      if(this.user && this.user.image){
      console.log(this.user);
      this.userImage = "/api/image/" + this.user.image;
      }
    })
  }

}
