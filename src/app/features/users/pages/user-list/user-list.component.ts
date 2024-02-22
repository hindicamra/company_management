import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../users.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/utilities/types/core-types';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,
    RouterModule, 
    MatIconModule,
    MatButtonModule, 
    MatListModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy{
  private _router = inject(Router);
  userService = inject(UsersService);
  usersSubscription!:Subscription;
  users:User[] = [];
constructor(){
  console.log('USERS CONSTRUCTOR');
}

ngOnInit(): void {
  this.usersSubscription = this.userService.getUsers().subscribe({
    next: res =>{ this.users = res;},
    error: err => { console.error(err.message);
    },
   
  });
}

ngOnDestroy(): void {
  this.usersSubscription?.unsubscribe();
}

editUser(id:string){
  this._router.navigate(['features', 'users', id]);
}
}
