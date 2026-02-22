import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerService } from '../../services/timer.service';
import { Timer } from '../../models/timer.type';

@Component({
  selector: 'app-timer',
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent {

  timerService = inject(TimerService);
  timers = this.timerService.getTimerList();

  runNow(t: Timer) {
    this.timerService.execute(t.name);
  }

  toggleTimer(t: Timer) {
    this.timerService.toggle(t);
    this.timers = this.timerService.getTimerList();
  }

}
