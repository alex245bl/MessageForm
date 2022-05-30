import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { letters } from '../models/letter.model';
import { topics } from '../models/topic.model';
import { users } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MailsService {
  baseUrl1 = 'https://localhost:7236/api/Letters'
  baseUrl2 = 'https://localhost:7236/api/Topics'
  baseUrl3 = 'https://localhost:7236/api/Users'

  constructor(private http: HttpClient) { }
  getAllletters(): Observable<letters[]>
  {
    return this.http.get<letters[]>(this.baseUrl1);
  }
  getAllTopics(): Observable<topics[]>{
    return this.http.get<topics[]>(this.baseUrl2);
  }
  getAllUsers(): Observable<users[]>{
    return this.http.get<users[]>(this.baseUrl3);
  }
  addMessage(newLetter:letters): Observable<letters> {
    newLetter.id= "00000000-0000-0000-0000-000000000000";
    return this.http.post<letters>(this.baseUrl1, newLetter);
  }
  addUser(newUser:users): Observable<users> {
    newUser.id = '00000000-0000-0000-0000-000000000000';    
    return this.http.post<users>(this.baseUrl3, newUser);
 }
}
