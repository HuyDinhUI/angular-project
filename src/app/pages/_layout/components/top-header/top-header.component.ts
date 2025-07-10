import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'top-header',
  templateUrl: './top-header.component.html',
  styleUrl: './top-header.component.scss',
  standalone:false
})

export class TopHeaderComponent {
  @Input() title = ''
}