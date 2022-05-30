import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { letters } from './models/letter.model';
import { users } from './models/user.model';
import { topics } from './models/topic.model';
import { MailsService } from './service/mails.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  letters : letters[] = [];
  users : users[] = [];
  topics : topics[] = [];
  help:boolean= false;
  fname = '';
  femail = '';
  fphone = '';

  newLetter : letters = {
    id: '',
    idUser: '',
    topic: '',
    message: ''
  }

  newUser : users = {
    id: '',
    name: '',
    email: '',
    phone: ''
  }

  captcha:string;
  constructor(private mailService: MailsService) {
    this.captcha='';
   }
   resolved(captchaResponse: string)
{
  this.captcha = captchaResponse;
} 
  ngOnInit(): void {
    this.getAllletters(); 
    this.getAllUsers();
    this.getAllTopics();
  }
  getAllletters(){
    this.mailService.getAllletters()
    .subscribe(
      response => {
        this.letters = response;
              
      }
    );
  }
  
  getAllUsers(){
    this.mailService.getAllUsers()
    .subscribe(
      response => {
        this.users = response;
      }
    );
  }

  getAllTopics(){
    this.mailService.getAllTopics()
    .subscribe(
      response => { 
        this.topics = response;
      }
    );
  }
  onSumbit(){
    for(let user of this.users){    // перебираем всех пользователей
      if(user.email == this.femail && user.phone == this.fphone){ // если почта и телефон совпадают
        this.newLetter.idUser = String(user.id);          // запоминаем ид пользователя
         
        this.mailService.addMessage(this.newLetter)  // отправляем все нужные данные (идЮзера, тему, сообщение) 
                                                          // ид сообщение само генерируется
        .subscribe(
          reponse => {              
            this.getAllletters();              
          }
        );
        
        this.help = true;
        break;
      }      
    } 
    
    if(!this.help){ // не нашел пользователя
      this.newUser.email = this.femail;
      this.newUser.name = this.fname;
      this.newUser.phone = this.fphone;

      
      this.mailService.addUser(this.newUser)  
        .subscribe(
          reponse => {   
            this.newLetter.idUser =String(reponse.id);              
            this.mailService.addMessage(this.newLetter)  
            .subscribe(
              reponse => {         
                this.getAllUsers();     
                this.getAllletters();              
              }
            );                 
          }
        );
        this.help = false;
    }
   
  }
  public phoneMask = ['+', '7',' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

}
