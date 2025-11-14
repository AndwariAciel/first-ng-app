export * from './appRestController.service';
import { AppRestControllerService } from './appRestController.service';
export * from './timerRestController.service';
import { TimerRestControllerService } from './timerRestController.service';
export const APIS = [AppRestControllerService, TimerRestControllerService];
