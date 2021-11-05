import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CInfoClient } from '../models/cinfo-client';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  // private socket = io(environment.s_url, {
  //   withCredentials: true,
  //   extraHeaders: {
  //     "my-custom-header": "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  //   }
  // });

  constructor(private http: HttpClient) { }

  private userList: any = [];
  private userListSubject: Subject<any> = new BehaviorSubject(this.userList);
  public userListObservable: Observable<any> = this.userListSubject.asObservable();

  emitUserList(array = this.userList): void {
    this.userListSubject.next(array);
  }

  soapCall() {

    const xmlhttp = new XMLHttpRequest();
    const url = 'http://82.165.249.114/WBCOMMUNICATIONSOCKET_WEB/awws/TestWebserviceSoap.awws';    
    const body =
        `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mat="http://mathsutility.test.com/">
           <soapenv:Header/>
             <soapenv:Body>
             <clMonEchange>
                <MesInfosClients>
                <m_nIdLog></m_nIdLog>
                <m_nIdClient></m_nIdClient>
                <m_sLoginClient>toto</m_sLoginClient>
                <m_sMdpClient>21</m_sMdpClient>
                <m_sNomClient></m_sNomClient>
                <m_sPrenomClient></m_sPrenomClient>
                <m_nRoleClient></m_nRoleClient>
                <m_sLibelleRoleClient></m_sLibelleRoleClient>
                <sAdresseClient></sAdresseClient>
                <sNomAppClient></sNomAppClient>
                <sVersionAppClient></sVersionAppClient>
                <heureConnexionCLient></heureConnexionCLient>
                
                <m_tabMesSockets>
                <m_sNomSocket>TestSocket</m_sNomSocket>
                <m_sPortSocket>950</m_sPortSocket>
                <m_sAdresseServeur>82.165.187.223</m_sAdresseServeur>
                <m_sModuleSocket>Utilisateurs</m_sModuleSocket>
                <m_bSocketOuvert>1</m_bSocketOuvert>
                </m_tabMesSockets>
                <m_sUrlBdd>82.165.249.114</m_sUrlBdd>
                <m_sNomBdd>ComposantConnexion</m_sNomBdd>
                <m_sUtilisateurBdd>CeliosHFSQL</m_sUtilisateurBdd>
                <m_sMdpBdd>s43Nk5d492AbAEvJ</m_sMdpBdd>
                <m_sTypeDemande>ListeUtilisateurs</m_sTypeDemande>
                <m_sModule>Utilisateurs</m_sModule>
                <m_bActionEffectue></m_bActionEffectue>
                <m_sInfoModif></m_sInfoModif>
                <m_bEstAdmin></m_bEstAdmin>
                <m_bEstActif></m_bEstActif>
                
                <m_bufFerInfo>cid:1375177674752</m_bufFerInfo>
                </MesInfosClients>
                <BufferFonction>cid:1002214704190</BufferFonction>
             </clMonEchange>
             </soapenv:Body>
           </soapenv:Envelope>`;

    if(xmlhttp){
      xmlhttp.open("POST", url, true);
      xmlhttp.setRequestHeader('Content-Type', 'text/xml');
      xmlhttp.setRequestHeader('soapAction', 'urn:TestWebserviceSoap/ListeUtilisateurs');
      xmlhttp.onreadystatechange =  () => {
        if(xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            const xml = xmlhttp.responseXML;
            this.userList = JSON.parse(atob(xml.getElementsByTagName('BufferFonction')[0].innerHTML));
          }
        }
        this.emitUserList();
      }
      xmlhttp.send(body);
    }    
  }
}