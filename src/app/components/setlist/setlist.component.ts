import { Component, Input, input } from '@angular/core';
import { Set } from '../../models/set.type';

@Component({
  selector: 'app-setlist',
  imports: [],
  templateUrl: './setlist.component.html',
  styleUrl: './setlist.component.scss'
})
export class SetlistComponent {
  set = input<Set>();
}
