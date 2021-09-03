import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket = io(environment.ws_url, {
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
    }
  });

  constructor() { }

  test(): void {
    console.log(this.socket);
    this.socket.on("hello", (arg) => {
      console.log(arg);
    })
  }

}
