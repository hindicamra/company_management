import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatDividerModule, MatInputModule,
  MatFormFieldModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
 auth = inject(AuthService);
 hidePass = true;
 form:FormGroup = new FormGroup({
 username:new FormControl('admin@gmail.com', [Validators.required, Validators.email]),
 password:new FormControl('123456', [
  Validators.required, 
  Validators.minLength(6)]),
 });
}
