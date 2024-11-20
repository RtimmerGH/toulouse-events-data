import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Events} from '../../models/event.model';
import {environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventRepository {
  private readonly http = inject(HttpClient);
  private readonly TLSE_API_URL = environment.tlseApiURL;

  public getEvents(limit: number, offset:number): Observable<Events>{
    return  this.http.get<Events>(
      this.TLSE_API_URL,
      { params: { limit: limit, offset:offset}}
    )
  }

}
