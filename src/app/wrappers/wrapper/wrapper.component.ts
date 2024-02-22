import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [CommonModule, RouterModule, MatSidenavModule, MatButtonModule, MatToolbarModule, MatIconModule,
  MatMenuModule, MatDividerModule],
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent {
auth = inject(AuthService);

  constructor(){

  }
}
