import {Component, HostListener, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthenticationService} from './auth.service';



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
  ngOnInit(): void {

    // Get Json Object and make it usable
    this.http.get('/api/users').subscribe(data => {
      this.jsonObj = JSON.parse(JSON.stringify(data));
      this.users = JSON.parse(JSON.stringify(data));
    });

    console.log(this.jsonObj);
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
  @HostListener('window:onbeforeunload', ['$event'])
  clearLocalStorage(event) {
    localStorage.clear(); }
}
