export * from './appRestController.service';
import { AppRestControllerService } from './appRestController.service';
export * from './shapeRestController.service';
import { ShapeRestControllerService } from './shapeRestController.service';
export * from './timerRestController.service';
import { TimerRestControllerService } from './timerRestController.service';
export const APIS = [AppRestControllerService, ShapeRestControllerService, TimerRestControllerService];
