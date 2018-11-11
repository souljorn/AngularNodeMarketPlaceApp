import { Component, OnInit } from '@angular/core';
import {ItemService} from '../item.service';
import {first} from 'rxjs/operators';
import {Item} from '../Item';
import {ImageService} from '../image.service';

@Component({
  selector: 'app-item-cards',
  templateUrl: './item-cards.component.html',
  styleUrls: ['./item-cards.component.css']
})
export class ItemCardsComponent implements OnInit {

  items: Array<Item>;
  image: File;

  constructor(
    private itemService:ItemService,
    private imageService:ImageService
  ) { }

  ngOnInit() {
    this.itemService.getItems().pipe(first()).subscribe(res => this.items = res);
  }

  getItemImage(filename : string){
   this.imageService.getImage(filename).pipe().subscribe(res => this.image = res);
  }

}
