import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sets } from '../models/sets.type';
import { Observable, map } from 'rxjs';
import { MagicSet } from '../models/set.type';
import { SetModel, AppRestControllerService } from '../shared/backend-api';


@Injectable({
  providedIn: 'root'
})
export class SetService {

  restService = inject(AppRestControllerService);

  getSetList(): Observable<Sets> {
    return this.restService.getSetList()
    .pipe(
      map(sets => { 
        const sorted = sets.sort((a, b) => (b.releaseDate ?? '').localeCompare(a.releaseDate ?? ''));
        return { data: sets.map(this.mapToSet) }
    })
    );
  }

  private mapToSet(set: SetModel): MagicSet {
    return {
      name: set.name ?? '',
      set_type: set.type ?? '',
      icon_svg_uri: set.iconUrl ?? '',
      code: set.code ?? '',
      released: set.released ?? false
    };
  }

  getStatusColor(set: MagicSet): string {
    if (set.released)
      return 'green';
    else
      return 'red';
  }

}


