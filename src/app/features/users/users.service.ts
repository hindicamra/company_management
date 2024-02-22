import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/utilities/types/core-types';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _http = inject(HttpClient);

  constructor() { }

  public getUsers(){
   return this._http.get<User[]>(environment.apiURL+'/users');
  }

  public getUserById(id:string):Observable<User>{
    return this._http.get<User>(environment.apiURL+'/users/' + id);
  }

  public createUser(data:any){

  }

  public editUser(data:any){

  }

 public deleteUser(id:string){

 }
}
