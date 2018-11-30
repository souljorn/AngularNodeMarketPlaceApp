import {Component, DoCheck, Input, OnInit} from '@angular/core';
import { MouseEvent } from '@agm/core';
import {Item} from '../Item';

@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.component.html',
  styleUrls: ['./googlemap.component.css']
})
export class GooglemapComponent implements OnInit, DoCheck {
  // google maps zoom level
  zoom: number = 14;

  // initial center position for the map
  lat: number = 29.6493;
  lng: number = -82.3440;

//allows child component to get data from parent component
  @Input() currentItem: Item;


  constructor() {
  }

  ngOnInit(): void {

  }
  ngDoCheck(){
    /*console.log("item data" + this.currentItem.description);
    console.log("item data" + this.currentItem.address);
    console.log("item data" + this.currentItem.address2);
    console.log("item data" + this.currentItem.city);
    console.log("item data" + this.currentItem.state);
    console.log("item data" + this.currentItem.zip);*/
}

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
    }
  ]
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
