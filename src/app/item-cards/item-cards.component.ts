import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ItemService} from '../item.service';
import {first} from 'rxjs/operators';
import {Item} from '../Item';
import {ImageService} from '../image.service';
import { ModalLoginComponent } from '../modal-login/modal-login.component';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-item-cards',
  templateUrl: './item-cards.component.html',
  styleUrls: ['./item-cards.component.css']
})
export class ItemCardsComponent implements OnInit {

  items: Array<Item>;
  image: File;
  show: boolean = false;
  message: string = "";
  arr: Array<string>


  @Output() titleEvent = new EventEmitter<string>();
  @Output() descEvent = new EventEmitter<string>();
  @Output() imgEvent = new EventEmitter<File>();
  title: string;

  constructor(
    private itemService: ItemService,
    private imageService: ImageService,
    private appComp: AppComponent

  ) { }

  ngOnInit() {
    this.itemService.getItems().pipe(first()).subscribe(res => this.items = res);
  }
  resetShow(){
    this.show = false;
  }
  testAlert(title, description, img) {
    this.show = true;
    this.titleEvent.emit(title);
    this.descEvent.emit(description);
    this.imgEvent.emit(img);
    this.appComp.receiveItemMessage(title, description, img);
  }
  getItemImage(filename : string){
   this.imageService.getImage(filename).pipe().subscribe(res => this.image = res);
  }

}
