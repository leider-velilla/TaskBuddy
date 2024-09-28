import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    MatNativeDateModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatDialogModule
  ],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  title = 'task-buddy';

  constructor(private router: Router) {}

  irAListaTareas() {
    this.router.navigate(['/lista-tareas']);
  }
}