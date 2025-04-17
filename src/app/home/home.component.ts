import { Component, inject, signal } from '@angular/core';
import { SetService } from '../services/set.service';
import { SetlistComponent } from '../components/setlist/setlist.component';

@Component({
  selector: 'app-home',
  imports: [SetlistComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  setService = inject(SetService);
  setList = signal(this.setService.setList);

  ngOnInit() {
    this.setService.getSetList()
      .subscribe((data) => {
        this.setList.set(data.data.filter((set) => set.set_type === 'expansion'));
      });
  }

}
