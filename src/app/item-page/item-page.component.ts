/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild } from '@angular/core';




@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css'],

})
export class ItemPageComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;


  constructor() { }

  ngOnInit() {
    var mapProp = {
      center:new google.maps.LatLng(29.6516, -82.3248),
      zoom:10,
    };
    let map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

  }

}
