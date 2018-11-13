import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ImageService} from '../image.service';
import {ItemService} from '../item.service';
import {Item} from '../Item';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '../auth.service';
import {Router} from '@angular/router';

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

  constructor(private http: HttpClient,
              private imageService: ImageService,
              private itemService: ItemService,
              private authService: AuthenticationService,
              private router: Router) { }



  ngOnInit() {
    this.authService.verifyUser().pipe(first()).subscribe(res => {
    this.response = res;
    console.log(this.response);
    if(this.response.message != 'Error'){
      console.log("First Name");
      this.userFirstName = this.response.firstname;
    }else {
      console.log("Error getting user info");
    }
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
      });
  }

  //TODO
  //category
  onSubmit(ngForm){
    console.log(ngForm);
    this.item.title = ngForm.title;
    this.item.description = ngForm.description;
    this.item.image = this.imageFilename;
    this.item.price = ngForm.price;
    this.item.seller = this.userFirstName;
    this.item.category = ngForm.controls['categories'].value;
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
