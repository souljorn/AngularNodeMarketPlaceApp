import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ImageService} from '../image.service';
import {UserService} from '../user.service';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '../auth.service';

@Component({
  selector: 'app-profile-create-form',
  templateUrl: './profile-create-form.component.html',
  styleUrls: ['./profile-create-form.component.css']
})
export class ProfileCreateFormComponent implements OnInit {
  selectedFile: File = null;
  ProileImagePreview: string;
  email;
  response;
  userImage: string;
  user;

  constructor(private http: HttpClient,
              private imageService: ImageService,
              private userService: UserService,
              private authService: AuthenticationService
  ) {}

  ngOnInit() {

    this.authService.verifyUser().pipe(first()).subscribe(res => {

      this.response = res;
      console.log(this.response);
      console.log(this.response.message);
      if(this.response.message != 'Error'){
        this.email = this.response.decoded.email;
        this.loadUserProfile();
      }
  })

    if(this.response.message === 'Error')
    {
      console.log("setting image");
      this.userImage = "../../src/assets/profile.jpg"
    }
    else {
      this.email = this.response.decoded.email;
      this.loadUserProfile();
    }

  }

  loadUserProfile(){
    this.userService.getUser(this.email).pipe(first()).subscribe(res => {
      console.log("loading user profile");
      this.user = res;
      this.userImage = this.user.image;
    })
  }

  onFileChanged(event) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    // this.http is the injected HttpClient
    var fd = new FormData();

    //Create a post to upload the file
    fd.append('file',  this.selectedFile, this.selectedFile.name);
    this.http.post('/api/image', fd)
      .subscribe(res => {
        console.log(res); // handle event here
      });
    //get image back to pace in preview

  }

}
