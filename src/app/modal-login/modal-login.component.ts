import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../app.component';
import {ItemService} from '../item.service';
import {Item} from '../Item';
import {first} from 'rxjs/operators';

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
  item: Item =new Item();

  constructor(
    private appComp: AppComponent,
    private itemService: ItemService
  ) { }

  ngOnInit() {
    this.title = this.arr[0];
    this.description = this.arr[1];
    this.image = this.arr[2];
    this.getAnItemByTitle(this.title);
  }

  closeModal(){
    var modal = document.getElementById('modal');
    modal.style.display = "none";
   }

  getAnItemByTitle(title:string){
    this.itemService.getItem(title).pipe(first()).subscribe(res => this.item = res);
  }

}
