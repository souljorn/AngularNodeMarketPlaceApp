import { Component, OnInit } from '@angular/core';
import {ItemService} from '../item.service';
import {first} from 'rxjs/operators';
import {Item} from '../Item';


@Component({
  selector: 'app-search-item-by-title',
  templateUrl: './search-item-by-title.component.html',
  styleUrls: ['./search-item-by-title.component.css']
})
export class SearchItemByTitleComponent implements OnInit {

  item: Item;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
  }


  //Get am item by title
  getAnItemByTitle(title:string){
    this.itemService.getItem(title).pipe(first()).subscribe(res => this.item = res);
  }
}
