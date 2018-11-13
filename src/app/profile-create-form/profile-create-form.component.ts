import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ImageService} from '../image.service';
import {UserService} from '../user.service';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '../auth.service';
import {Accounts} from '../Accounts';
import {Router} from '@angular/router';

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
  imageFilename;
  imageObject;
  account: Accounts = new Accounts();

  constructor(private http: HttpClient,
              private imageService: ImageService,
              private userService: UserService,
              private authService: AuthenticationService,
              private router: Router
  ) {}

  ngOnInit() {
    this.authService.verifyUser().pipe(first()).subscribe(res => {
      this.response = res;
      console.log(this.response);
      if(this.response.message != 'Error'){
        console.log("Get email");
        this.email = this.response.decoded.email;
        this.loadUserProfile();
      }else {
        this.userImage = "../../src/assets/profile.jpg";
        console.log("Set basic image");
      }
    })
  }

  loadUserProfile(){
    this.userService.getUser(this.email).pipe(first()).subscribe(res => {
      console.log("loading user profile");
      this.user = res;
      this.userImage = "http://localhost:8080/api/image/" + this.user.image;
      console.log(this.user.image);
    })
  }

  onFileChanged(event) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
    this.onUpload();
  }

  onUpload() {
    // this.http is the injected HttpClient
    var fd = new FormData();

    //Create a post to upload the file
    fd.append('file',  this.selectedFile, this.selectedFile.name);
    this.http.post('/api/image', fd)
      .subscribe(res => {
        console.log(res);
        this.imageObject = res;
        this.imageFilename = this.imageObject.file.filename;
        this.userImage = "http://localhost:8080/api/image/" + this.imageFilename;
        // handle event here

      });
    //get image back to pace in preview

  }

  onSubmit(ngForm){
    console.log(ngForm);
    this.account.firstname = ngForm.firstname;
    this.account.lastname = ngForm.lastname;
    this.account.image = this.imageFilename;
    console.log(this.account);
    this.userService.updateUser(this.email, this.account).subscribe(res => {
        console.log("image update");
        console.log(res);
      }
    )
    this.router.navigate(['/profile']);
  }

}
