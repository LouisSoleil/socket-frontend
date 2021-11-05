import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private socketS: SocketService,
    private utilisateurS: UtilisateurService) { }

    public signInForm: FormGroup;
    public listUser: any;
    public listUserObservable: Observable<any> = this.socketS.userListObservable;

  ngOnInit(): void {
    this.initForm();
  }

  get_all_user(): void {
    this.socketS.soapCall();
    this.listUserObservable.subscribe(
      (data) => {
        this.listUser = data;
        
    });    
  }

  delete_array(): void{
    this.listUser = [];
    this.socketS.emitUserList(this.listUser);
  }

  initForm(): void {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.signInForm = this.formBuilder.group({
      mail: new FormControl('', [Validators.required, Validators.pattern(emailregex)]),
      mdp: new FormControl('', [Validators.required])
    })
  }

  submitForm(): void {
    console.log(this.signInForm.value);
  }

  getErrorEmail() {
    return this.signInForm.get('mail').hasError('required') ? "Une adresse mail est requise" :
      this.signInForm.get('mail').hasError('pattern') ? 'Le format ne correspond pas à une adresse mail' : '';
  }

  getErrorPassword() {
    return this.signInForm.get('mdp').hasError('required') ? 'Un mot de passe est requis' : '';
  }

}
