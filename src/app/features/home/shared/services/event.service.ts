import {inject, Injectable} from '@angular/core';
import {EventRepository} from '../repositories/event.repository';
import {EventStatesService} from './event-states.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly eventRepository = inject(EventRepository);
  private readonly eventStateService = inject(EventStatesService);

  public getEvents(limit: number, offset:number){
    this.eventRepository.getEvents(limit, offset).subscribe(
      (events) => this.eventStateService.eventsSignals.set(events)
    )
  }

}
