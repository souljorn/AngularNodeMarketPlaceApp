import { Component, OnInit } from '@angular/core';
import {ItemService} from '../item.service';
import {first} from 'rxjs/operators';
import {Item} from '../Item';

@Component({
  selector: 'app-item-cards',
  templateUrl: './item-cards.component.html',
  styleUrls: ['./item-cards.component.css']
})
export class ItemCardsComponent implements OnInit {

  items: Array<Item>;

  constructor(
    private itemService:ItemService
  ) { }

  ngOnInit() {
    this.itemService.getItems().pipe(first()).subscribe(res => this.items = res);
  }

}
