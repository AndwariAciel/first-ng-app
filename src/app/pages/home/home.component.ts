import { Component, inject, signal } from '@angular/core';
import { SetService } from '../../services/set.service';
import { SetlistComponent } from '../../components/setlist/setlist.component';
import { CardOverviewComponent } from '../../components/card-overview/card-overview.component';
import { Set } from '../../models/set.type';
import { MatListModule } from '@angular/material/list';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-home',
  imports: [SetlistComponent, CardOverviewComponent, MatListModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  setService = inject(SetService);
  cardService = inject(CardService)
  setList: Set[] = [];

  ngOnInit() {
    this.setService.getSetList()
      .subscribe((data) => {
        this.setList = data.data.filter((set) => set.set_type === 'expansion');
      });
  }

}
