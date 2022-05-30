import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template:` <input [textMask]="{mask: mask}" [(ngModel)]="myModel" type="text"/> ,
   <re-captcha (resolved)="resolved($event)"siteKey="YOUR_SITE_KEY"></re-captcha>`,
})
export class AppComponent {
  captcha:string;
  email:string;

  constructor() {
    this.captcha='';
    this.email='Secret@gmail.com';
  }
  title = 'Mails';
  public myModel = ''
  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
}
