import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private url = 'http://localhost:8080';
  private socket;
  messageNew = new Message;

  public sendMessage(message: Message) {
    this.socket = io(this.url);
    this.socket.emit('add-message', {content: message.content, sender: message.sender});
    console.log("Sent message" + message.content + " " + message.sender);
  }

  public getMessages() {
    let observable = new Observable(observer => {
     console.log("Fetching all Messages");
      this.socket = io(this.url);
      this.socket.on('message', (message: Message) => {
        observer.next(message);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }
}
