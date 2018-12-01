import { Pipe, PipeTransform } from '@angular/core';
import {ItemCardsComponent} from "./item-cards/item-cards.component";
import {Item} from "./Item";
import {convertRuleOptions} from "tslint/lib/configuration";

@Pipe({
  name: 'filterItems',
  pure: false
})
export class FilterItemsPipe implements PipeTransform {

  transform(items: Item[], filterInpt: string, address: string): any {
    var myFilter = " ";

    if(filterInpt == "" && address=="" ){
      return items;
    }
   if(filterInpt == ""){
      myFilter = address;
     return items.filter(item => (item.address + item.address2 +item.city + item.state).toLowerCase().indexOf(myFilter.toLowerCase()) !== -1);
    }
    if(address == ""){
      myFilter = filterInpt;
      return items.filter(item => item.title.toLowerCase().indexOf(myFilter.toLowerCase()) !== -1);
    }
    return items;
  }
}
