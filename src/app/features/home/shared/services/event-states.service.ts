import {computed, Injectable, signal} from '@angular/core';
import {Events} from '../../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventStatesService {

  eventsSignals = signal<Events>({total_count:0,results:[]});
  eventsGeojson = computed(() => {
    return {
      type: 'FeatureCollection',
      features:
        this.eventsSignals().results.map((event) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates:
              [event.googlemap_longitude, event.googlemap_latitude],
          },
          properties: {
            ...event
          }
        } as GeoJSON.Feature))
    } as GeoJSON.FeatureCollection<GeoJSON.Point>;
  })

}
