import {Component, HostListener, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthenticationService} from './auth.service';
import {first} from 'rxjs/operators';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  // Define a users property to hold our user data
  users: Array<any>;
  jsonObj;
  loggedIn = false;  // Bool to signify if user is logged in
  message: string;
  title: string;
  description: string;
  image: File;
  private response: any;


  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,

  ) {}

  // Received the event from the login component
  receiveMessage($event) {
    this.message = $event;
    console.log('Recieved Event');
    this.loggedIn = true;
  }
  receiveItemMessage(str, str2, img){
    this.title = str;
    this.description = str2;
    this.image = img;
  }
  sendItem(){
    var arr = [this.title, this.description, this.image]
    return arr;

  }
  ngOnInit() {
    this.auth.verifyUser().pipe(first()).subscribe(res => {
      this.response = res;
      console.log(this.response);
      if(this.response.message != 'Error'){
        this.loggedIn = true;

      }else {
        this.loggedIn = false;
      }
    })
  }

  // Function called when logout button is clicked
  logout() {
    if (localStorage.getItem('currentUser')) {
      this.auth.logout();
      alert('Logged out successfully');
      this.loggedIn = false;
    } else {
      alert('You were not logged in');
    }
  }

  // Destroys token when browser is closed
  // @HostListener('window:onbeforeunload', ['$event'])
  // clearLocalStorage(event) {
  //   localStorage.clear(); }
}
