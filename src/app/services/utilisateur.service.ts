import { Injectable } from '@angular/core';
import { CInfoClient } from '../models/cinfo-client';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(
    private http: HttpClient
  ) { }

  getListUser(): void{
    let user: CInfoClient = new CInfoClient('toto', '21', '82.165.249.114', 'ComposantConnexion', 'CeliosHFSQL', 's43Nk5d492AbAEvJ');
    const params = new HttpParams;
    params.set('firstName', 'Peter');
    params.set('lastName', 'Parker');
    console.log('user : ', user);
    console.log('params : ', params);
    this.http.get('http://82.165.249.114/WBCOMMUNICATIONSOCKET_WEB/awws/TestWebserviceSoap.awws', {responseType: 'text', params })
         .pipe(
           map((xmlString: string)=>{
             const asJson = this.xmlStringToJson(xmlString);
             return asJson;
           }),
           catchError((err)=> {
             console.warn('INT ERR:', err);
             return err;     
           })
         );
  }

  xmlStringToJson(xml: string)
  {
    const oParser = new DOMParser();
    const xmlDoc = oParser.parseFromString(xml, "application/xml");
    return this.xmlToJson(xmlDoc);
  }

  xmlToJson(xml)
  {
    var obj = {};

    if (xml.nodeType == 1) {
      if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == 3) {
      obj = xml.nodeValue;
    }
    if (xml.hasChildNodes()) {
      for(var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof(obj[nodeName]) == "undefined") {
          obj[nodeName] = this.xmlToJson(item);
        } else {
          if (typeof(obj[nodeName].push) == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(this.xmlToJson(item));
        }
      }
    }
    return obj;
  }
}
