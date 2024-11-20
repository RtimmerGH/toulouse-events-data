import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {EventCardComponent} from '../../components/event-card/event-card.component';
import {EventService} from '../../shared/services/event.service';
import {EventStatesService} from '../../shared/services/event-states.service';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {BreakpointsService} from '../../../../layout/services/breakpoints.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {tap} from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MatButton,
    EventCardComponent,
    AsyncPipe,
    MatGridList,
    MatGridTile,
    NgOptimizedImage
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit {

  private readonly eventServices = inject(EventService);
  public events = inject(EventStatesService).eventsSignals;
  breakpoint = inject(BreakpointsService);

  showMap : boolean = false;
  gridColumn = signal(1);
  isMobile$ = this.breakpoint.isMobile$.pipe(
    takeUntilDestroyed(),
    tap((isMobile) => isMobile ? this.gridColumn.set(1)  : void 0)
  ).subscribe();
  isTablet$ = this.breakpoint.isTablet$.pipe(
    takeUntilDestroyed(),
    tap((isMobile) => isMobile ? this.gridColumn.set(2) : void 0)
  ).subscribe();
  isDesktop$ = this.breakpoint.isDesktop$.pipe(
    takeUntilDestroyed(),
    tap((isMobile) => isMobile ? this.gridColumn.set(3) : void 0)
  ).subscribe();

  ngOnInit() {
    this.eventServices.getEvents(20, 0);
  }

}
