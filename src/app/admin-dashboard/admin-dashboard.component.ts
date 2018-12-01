import { Component, OnInit } from '@angular/core';
import {first} from "rxjs/operators";
import {Accounts} from "../Accounts";
import {UserService} from '../user.service';
import {ItemService} from "../item.service";
import {Item} from "../Item";

import '@polymer/iron-icons/iron-icons.js';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  accounts: Array<Accounts>;
  show: boolean = false;
  items: Array<Item>;
  getUser: Accounts;

  constructor(
    private userService: UserService,
    private itemService: ItemService,

  ){

  }

  ngOnInit() {
    this.userService.getUsers().pipe(first()).subscribe(res => this.accounts = res);
    this.itemService.getItems().pipe(first()).subscribe(res => this.items = res,);
  }

  currUser(user){
    console.log(user);
    this.getUser = user;
  }

}
