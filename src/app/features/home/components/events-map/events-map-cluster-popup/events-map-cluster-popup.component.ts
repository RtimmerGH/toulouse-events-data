import {ChangeDetectionStrategy, Component, computed, effect, input, output} from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatDivider} from '@angular/material/divider';
import {Cluster, ClusterMetadata} from '../../../models/cluster.model';

@Component({
  selector: 'app-events-map-cluster-popup',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatIconButton,
    MatDivider
  ],
  templateUrl: './events-map-cluster-popup.component.html',
  styleUrl: './events-map-cluster-popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsMapClusterPopupComponent {
  clusterPoints = input.required<Cluster>();
  clusterPointsMetaData = input.required<ClusterMetadata | undefined>();
  onClickNext = output();
  onClickPrevious = output();
  pageInfo = computed(() => this.clusterPoints() ? `${this.clusterPoints().clusterMetaData.eventsOffset+1} - ${this.clusterPoints().clusterMetaData.eventsOffset + this.clusterPoints().clusterMetaData.eventsCount < this.clusterPoints().clusterMetaData.totalEventsCount ? this.clusterPoints().clusterMetaData.eventsOffset + this.clusterPoints().clusterMetaData.eventsCount : this.clusterPoints().clusterMetaData.totalEventsCount} / ${this.clusterPoints().clusterMetaData.totalEventsCount}` : '-');

  popupEffect = effect(() => this.clusterPoints() ? console.log('clusterPointsMetaData: ',this.clusterPoints()) : console.log('undefinedChild'));

}
