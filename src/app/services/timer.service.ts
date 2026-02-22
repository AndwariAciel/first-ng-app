import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Timer, Timers } from '../models/timer.type';
import { TimerModel, TimerRestControllerService } from '../shared/backend-api';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  restService = inject(TimerRestControllerService);

  getTimerList(): Observable<Timers> {
    return this.restService.getTasks().pipe(
      map((timers: TimerModel[]) => ({
        data: timers.map(this.mapToTimer)
      }))
    );
  }

  execute(name: string): void {
    this.restService.execute(name as any).subscribe();
  }

  toggle(task: Timer): void {
    if (task.status === 'ACTIVE') {
      this.restService.stop(task.name as any).subscribe();
    } else {
      this.restService.start(task.name as any).subscribe();
    }
  }

  private mapToTimer(timer: TimerModel): Timer {
    return {
      name: timer.name ?? '',
      status: timer.status ?? '',
      cron: timer.cron ?? ''
    };
  }
}
