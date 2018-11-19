import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ImageService} from '../image.service';
import {ItemService} from '../item.service';
import {Item} from '../Item';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '../auth.service';
import {Router} from '@angular/router';
import {UserService} from '../user.service';

@Component({
  selector: 'app-upload-item',
  templateUrl: './upload-item.component.html',
  styleUrls: ['./upload-item.component.css']
})
export class UploadItemComponent implements OnInit {
  selectedFile: File = null;
  item: Item = new Item;
  imageFilename;
  imageObject;
  userFirstName;
  response;
  category;
  email;
  user;
  itemImage;

  constructor(private http: HttpClient,
              private imageService: ImageService,
              private itemService: ItemService,
              private authService: AuthenticationService,
              private router: Router,
              private userService: UserService,) { }

  ngOnInit() {
    this.authService.verifyUser().pipe(first()).subscribe(res => {
    this.response = res;
    console.log(this.response);
    if(this.response.message != 'Error'){
      console.log("First Name");
      this.email = this.response.decoded.email;
      this.loadUserProfile();
    }else {
      console.log("Error getting user info");
    }
  })
  }

  loadUserProfile(){
    this.userService.getUser(this.email).pipe(first()).subscribe(res => {
      console.log("loading user profile");
      this.user = res;
      this.userFirstName = this.user.firstname;
    })
  }

  onFileChanged(event) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
    this.onUpload();
  }

  onUpload() {
    var itemImage = new FormData();

    itemImage.append('file',  this.selectedFile, this.selectedFile.name);
    this.http.post('/api/image', itemImage)
      .subscribe(res => {
        console.log(res); // handle event here
        this.imageObject = res;
        this.imageFilename = this.imageObject.file.filename;
        this.itemImage =  "http://localhost:8080/api/image/" + this.imageFilename;
      });
  }

  onSubmit(ngForm){
    console.log(ngForm);
    this.item.title = ngForm.title;
    this.item.description = ngForm.description;
    this.item.image = this.imageFilename;
    this.item.price = ngForm.price;
    this.item.seller = this.userFirstName;
    this.item.category = ngForm.category;
    this.item.address = ngForm.address;
    this.item.address2 = ngForm.address2;
    this.item.city = ngForm.city;
    this.item.state = ngForm.state;
    this.item.zip = ngForm.zip;
    this.item.country = ngForm.country;
    console.log(this.item);
    this.itemService.createItem(this.item).subscribe(res => {
        console.log("Item Created");
        console.log(res);
      }
    );
    this.router.navigate(['/itemPage']);
  }

}
