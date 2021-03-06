import { Component, OnInit } from '@angular/core';
import {ItemService} from '../item.service';
import {first} from 'rxjs/operators';
import {Item} from '../Item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  items: Array<Item>;
  item: Item;

  constructor(private itemService:ItemService) { }

  ngOnInit() {
    this.itemService.getItems().pipe(first()).subscribe(res => this.items = res);
  }

  //Get am item by title
  getAnItemByTitle(title:string){
    this.itemService.getItem(title).pipe(first()).subscribe(res => this.item = res);
  }

}
