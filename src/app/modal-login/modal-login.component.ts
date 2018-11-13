import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {
  title: string = "";
  description: string = "";
  arr: Array<any>;
  image: File;

  constructor(
    private appComp: AppComponent,
  ) { }

  ngOnInit() {
    this.arr  = this.appComp.sendItem()
    this.title = this.arr[0];
    this.description = this.arr[1];
    this.image = this.arr[2];
  }

  closeModal(){
    var modal = document.getElementById('modal');
    modal.style.display = "none";
   }

}
