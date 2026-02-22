import { Component, inject, signal } from '@angular/core';
import { SetService } from '../../services/set.service';
import { SetlistComponent } from '../../components/setlist/setlist.component';
import { CardOverviewComponent } from '../../components/card-overview/card-overview.component';
import { MagicSet } from '../../models/set.type';
import { MatListModule } from '@angular/material/list';
import { CardService } from '../../services/card.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CardOverviewComponent, MatListModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  setService = inject(SetService);
  cardService = inject(CardService)
  setList: MagicSet[] = [];

  ngOnInit() {
    this.setService.getSetList()
      .subscribe((data) => {
        this.setList = data.data.filter((set) => set.set_type === 'EXPANSION');
      });
  }

}
