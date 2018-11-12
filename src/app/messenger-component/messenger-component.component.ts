import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-messenger-component',
  templateUrl: './messenger-component.component.html',
  styleUrls: ['./messenger-component.component.css']
})
export class MessengerComponentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}


