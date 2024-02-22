import { Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../users.service';
import { User } from 'src/app/core/utilities/types/core-types';
import { EMPTY, Unsubscribable, of, switchMap, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule,
  MatInputModule, MatIconModule],
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit, OnDestroy{
 userService = inject(UsersService);
 private _router = inject(ActivatedRoute);
 router = inject(Router);
 itemId:string = 'new';
 user!:User;
 routeSub!:Unsubscribable;

 form = new FormGroup({
  id:new FormControl<string | null>(null),
  firstName: new FormControl<string | null>(null, [Validators.required]),
  lastName:new FormControl<string | null>(null, [Validators.required]),
  uuid: new FormControl<string | null>(null, 
  [Validators.required, 
  Validators.minLength(13),
  Validators.maxLength(13)]),
  amount: new FormControl<number>(0, [Validators.required, Validators.min(800)]),
  dob:new FormControl<Date | null>(null, [Validators.required])
 });
 constructor(){

 }
  ngOnInit(): void {

   this.routeSub =  this._router.params.pipe(
      switchMap((p) => {
        this.itemId = p['id'];
        if(this.itemId === 'new') 
        return EMPTY;
        return this.userService.getUserById(p['id']);
      })
    ).subscribe({
      next: res => {
        this.user = {...res},
        this.form.patchValue(res)
      },
      error: err => console.error(err)
    }
    );
  //   this.routeSub = this._router.params.subscribe(p => {
  //     console.log('route response', p);
  //     this.itemId = p['id'];
  //     console.log('ID iz rute', p['id']);
  //   });

  //   this.userSub = this.userService.getUserById(this.itemId).subscribe({
  //     next: (res) =>{
  //       console.log(res);
  //       this.user = {...res};
  //       this.userSub?.unsubscribe();
  //     },
  //     error:(err) => console.error(err)
  // });
}

goBack(){
  this.router.navigate(['features', 'users']);
}

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }
}
