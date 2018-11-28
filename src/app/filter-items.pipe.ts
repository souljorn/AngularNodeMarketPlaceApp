import { Pipe, PipeTransform } from '@angular/core';
import {ItemCardsComponent} from "./item-cards/item-cards.component";
import {Item} from "./Item";

@Pipe({
  name: 'filterItems',
  pure: false
})
export class FilterItemsPipe implements PipeTransform {

  transform(items: Item[], filterInpt: string): any {
    if(filterInpt == null){
      return items;
    }
    return items.filter(item => item.title.toLowerCase().indexOf(filterInpt.toLowerCase()) !== -1);
  }
}
