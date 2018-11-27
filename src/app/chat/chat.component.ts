import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef } from '@angular/core';
import { MessageService } from '../message.service';
import {Message} from '../message';
import {AuthenticationService} from '../auth.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

@ViewChild('chatInput') chatInput: ElementRef;

public messages = [];
public connection;
public message = new Message;
public currentUser;
public response;
errorMessage;

  constructor(private messageService: MessageService,
              private auth: AuthenticationService) { }

  ngOnInit() {
    this.message.content = '';
    // this.connection = this.messageService.getMessages().subscribe(message => {
    //   this.messages.push(message);
    //
    // })
    this.getUser();

  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  sendMessage() {
    this.messageService.sendMessage(this.message);
    this.message.content = '';
  }

  getUser(){
    this.auth.verifyUser().pipe(first()).subscribe(res => {
      this.response = res;
      this.currentUser = this.response.decoded.email;
      this.message.sender = this.currentUser
    });
  }

@HostListener('click')
public autofocusInput() {
    this.chatInput.nativeElement.focus();
  }
}
