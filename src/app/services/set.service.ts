import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sets } from '../models/sets.type';
import { Observable, map, tap } from 'rxjs';
import { MagicSet } from '../models/set.type';
import { SetEntity, AppRestControllerService } from '../shared/backend-api';


@Injectable({
  providedIn: 'root'
})
export class SetService {

  httpService = inject(HttpClient);
  restService = inject(AppRestControllerService);

  getSetList(): Observable<Sets> {
    return this.restService.getSetList().pipe(
          tap(v => console.log("REAL API RESPONSE:", v)),
      map(sets => ({ data: sets.map(this.mapToSet) }))
    );
  }

  private mapToSet(set : SetEntity): MagicSet {
    return {
      name: set.name ?? '',
      set_type: set.type ?? '',
      icon_svg_uri: set.iconUrl ?? '',
      code: set.code ?? ''
    };
  }

}


