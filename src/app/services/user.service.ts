import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { CharacterResponse } from '../models/character.model';

@Injectable({
  providedIn: 'root',
})
export default class UserService {
  private user: any = signal(null);
  constructor(private http: HttpClient) {}

  setUser(user: any) {
    this.user.set(user);
    localStorage.setItem('user', JSON.stringify(user));
    console.log(this.user());
  }

  getUser() {
    if (this.user()) {
        return this.user();
    } else {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            this.user.set(user);
        }
        return this.user();
    }
  }

  getSignal() {
    return this.user;
  }

  login(username: string) {
    return this.http.post<any>('http://localhost:8080/api/login', { username });
  }

  likeCharacter(name: string) {
    this.user.mutate((user: any) => {
        const index = user.likedCharacters.findIndex((c: any) => c === name);
        if (index !== -1) {
          user.likedCharacters.splice(index, 1);
        } else {
          user.likedCharacters.push(name);
        }
    });
    
    this.http.put<any>('http://localhost:8080/api/update', {user: this.user()}).subscribe((res) => this.setUser(res));
  }

//   updateUser() {
//     return this.http.put<any>('http://localhost:8080/api/update', {user: this.user()}).subscribe((res) => this.setUser(res));
//   }
}
