import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CInfoClient } from '../models/cinfo-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket = io(environment.s_url, {
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
    }
  });

  constructor(private http: HttpClient) { }

  log_socket(): void {
    console.log(this.socket);
    this.socket.on("hello", (arg) => {
      console.log(arg);
    })
  }

  /*
  log_webservice(): void {
    this.http.post
  }
  */

  get_all_user(): void {
    /*
    
    let res = this.http.get<any>(`${environment.ws_url}/ListeUtilisateurs`).toPromise();
    //let res_soap = this.soap.createClient('http://82.165.249.114/WBCOMMUNICATIONSOCKET_WEB/awws/TestWebserviceSoap.awws?wsdl');
    console.log(res);
    //console.log(res_soap);
    */
    let user: CInfoClient = new CInfoClient('toto', '21', '82.165.249.114', 'ComposantConnexion', 'CeliosHFSQL', 's43Nk5d492AbAEvJ');
    //console.log(user);
    var xmlReq = new XMLHttpRequest();
    xmlReq.open("GET", 'http://82.165.249.114/WBCOMMUNICATIONSOCKET_WEB/awws/ListeUtilisateurs.htm');
    console.log(xmlReq);
    this.http.get('http://82.165.249.114/WBCOMMUNICATIONSOCKET_WEB/awws/ListeUtilisateurs.htm').subscribe( data => {
      console.log(data);
    })
  }



}
