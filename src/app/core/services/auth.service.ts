import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { LoginUser } from '../utilities/types/core-types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _usernameAdmin = 'admin@gmail.com';
  private readonly _passwordAdmin = '123456';

private _http = inject(HttpClient);
private _router = inject(Router);

//TODO zamijeniti tip any sa User
private _user!:LoginUser;
public get user() {
  return this._user;
}
  constructor() { }

  public login(
    username:string | null = null, 
    password:string | null = null){
      if(this._usernameAdmin !== username || this._passwordAdmin !== password){
         console.log('Pogresni pristupni podaci');
         return;
      }

      
      // login logika
      //TODO change any with coresponding type
    this._http.get<any>(`${environment.apiURL}/login-admin`).subscribe(
    { 
      
        next:(res)=>
        {
         
          if(!res)
          {
            console.log('Neuspjesan odgovor od servera');
            return;
          }
                
          

          localStorage.setItem('currentUser', JSON.stringify(res));
          this._user = {...res};
          console.log('USER:',this.user);

          setTimeout(() => {
            this._router.navigate(['features']);
          },400);
          console.log('login response', res)},
        error:(err)=>console.log(err),
    });


      //TODO extend login with basic user
  }

  public logout(){
    localStorage.removeItem('currentUser');
    this._router.navigate(['/login']);
  }
}