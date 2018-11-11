import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-profile-create-form',
  templateUrl: './profile-create-form.component.html',
  styleUrls: ['./profile-create-form.component.css']
})
export class ProfileCreateFormComponent implements OnInit {
  selectedFile: File = null;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onFileChanged(event) {
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    // this.http is the injected HttpClient
    var fd = new FormData();
    fd.append('file',  this.selectedFile, this.selectedFile.name);
    this.http.post('/api/image', fd)
      .subscribe(res => {
        console.log(res); // handle event here
      });
  }

}
