import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirect() {
    this.router.navigate(['/messenger']);
  }
}
