import {Component, EventEmitter, NgModule, OnInit, Output, Pipe} from '@angular/core';
import {ItemService} from '../item.service';
import {first, timeInterval} from 'rxjs/operators';
import {Item} from '../Item';
import {ImageService} from '../image.service';
import {AppComponent} from '../app.component';
import {HomeComponent} from "../home/home.component";
import {FilterItemsPipe} from "../filter-items.pipe";


@Component({
  selector: 'app-item-cards',
  templateUrl: './item-cards.component.html',
  styleUrls: ['./item-cards.component.css'],
})
export class ItemCardsComponent implements OnInit{

  items: Array<Item>;
  getItem: Item;
  mapData: Item;
  image: File;
  address: string = "";
  isInptDesc: boolean = false;
  isInptAddr: boolean = false;
  message: string = "";
  imageLink: string = '/api/image';
  title = "";


  @Output() titleEvent = new EventEmitter<string>();
  @Output() descEvent = new EventEmitter<string>();
  @Output() imgEvent = new EventEmitter<File>();



  constructor(
    private itemService: ItemService,
    private imageService: ImageService,
    private homeComp: HomeComponent,
    private appComp: AppComponent,
  ) { }

  ngOnInit() {
    this.itemService.getItems().pipe(first()).subscribe(res => this.items = res,);

    if(this.getItem == null)
      this.imageLink = '';

    else
      this.imageLink = '/api/image';

  }
  checkInptDescr(e){

    if(e.target.value.toString() == ""){
      this.isInptDesc = false;
    }
    else{
      this.isInptDesc = true;
    }
  }
  checkInptAddr(e){
    if(e.target.value.toString() == ""){
      this.isInptAddr = false;
    }
    else{
      this.isInptAddr = true;
    }
  }
  currItem(itm) {

    this.getItem = itm;
    if(this.getItem == null)
      this.imageLink = '';
    else{
      this.imageLink = '/api/image/';
      this.mapData = this.getItem;
    }
  }
  getItemImage(filename : string){
   this.imageService.getImage(filename).pipe().subscribe(res => this.image = res);
  }

}
