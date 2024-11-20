import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal, ViewChild
} from '@angular/core';
import {
  AttributionControlDirective,
  ControlComponent,
  FeatureComponent,
  GeoJSONSourceComponent,
  ImageComponent,
  LayerComponent,
  MapComponent,
  MarkerComponent, NavigationControlDirective, PopupComponent, ScaleControlDirective
} from '@maplibre/ngx-maplibre-gl';
import {MatIcon} from '@angular/material/icon';
import {EventStatesService} from '../../shared/services/event-states.service';
import {EventService} from '../../shared/services/event.service';
import {LngLat, MapLayerMouseEvent} from 'maplibre-gl';
import {NgOptimizedImage} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {EventsMapClusterPopupComponent} from './events-map-cluster-popup/events-map-cluster-popup.component';
import {Cluster, ClusterMetadata} from '../../models/cluster.model';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-events-map',
  standalone: true,
  imports: [
    MapComponent,
    MarkerComponent,
    MatIcon,
    ImageComponent,
    LayerComponent,
    GeoJSONSourceComponent,
    FeatureComponent,
    PopupComponent,
    NgOptimizedImage,
    MatButton,
    ControlComponent,
    NavigationControlDirective,
    ScaleControlDirective,
    AttributionControlDirective,
    EventsMapClusterPopupComponent
  ],
  templateUrl: './events-map.component.html',
  styleUrl: './events-map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsMapComponent {

  readonly MAP_TILER_URL = environment.mapTilerURL;
  readonly MAP_TILER_KEY = environment.mapTilerKEY;

  @ViewChild(GeoJSONSourceComponent) geoJSONSource!: GeoJSONSourceComponent;

  private readonly eventStatesService = inject(EventStatesService);
  private readonly eventServices = inject(EventService);

  private readonly events = this.eventStatesService.eventsSignals;
  readonly eventsGeojson = this.eventStatesService.eventsGeojson;
  cursorStyle = signal('');
  selectedClusterPoints = signal<Cluster | undefined>(undefined);
  selectedClusterPointsMetaData = signal<ClusterMetadata | undefined>(undefined);

  selectedFeature: GeoJSON.Feature | undefined;
  selectedCluster: GeoJSON.Feature | undefined;
  imageLoaded: boolean = false;
  popupLngLat:  LngLat | undefined;
  eventsOffset: number = 0;
  clusterEventsOffset: number = 0;
  clusterEventsCount: number = 5;

  ngOnInit(){
      if(!(this.events().results.length > 0)) {
        this.eventServices.getEvents(20, this.eventsOffset);
        this.eventsOffset = 20;
      }
  }

  onClickPoint(evt: MapLayerMouseEvent) {
    this.selectedCluster = undefined;
    this.selectedFeature = evt.features![0];
    this.popupLngLat = evt.lngLat;
  }

  onClickCluster(evt: MapLayerMouseEvent) {
    this.selectedFeature = undefined;
    this.selectedCluster = evt.features[0];
    this.popupLngLat = evt.lngLat;
    this.clusterEventsOffset = 0;
    this.getClusterPoints(this.selectedCluster.properties['cluster_id'], this.clusterEventsCount, this.clusterEventsOffset)
  }

  getNextEvents() {
    this.resetSelection();
    this.eventServices.getEvents(20, this.eventsOffset);
    this.eventsOffset += 20;
  }

  resetSelection(): void {
    this.selectedCluster = undefined;
    this.selectedFeature = undefined;
    this.popupLngLat = undefined;
    this.clusterEventsOffset = 0;
  }

  getNextClusterEvents() {
    this.clusterEventsOffset += this.clusterEventsCount;
    if (this.clusterEventsOffset >= this.selectedCluster.properties['point_count']){
      this.clusterEventsOffset = 0;
    }
    console.log('clusterEventsOffset: ', this.clusterEventsOffset);
    this.getClusterPoints(this.selectedCluster.properties['cluster_id'], this.clusterEventsCount, this.clusterEventsOffset)
  }

  getPreviousClusterEvents() {
    this.clusterEventsOffset -= this.clusterEventsCount;
    if (this.clusterEventsOffset < 0){
      console.log('Offset: ',this.clusterEventsOffset );
      this.clusterEventsOffset = this.selectedCluster.properties['point_count'] - (this.selectedCluster.properties['point_count'] % this.clusterEventsCount > 0 ? this.selectedCluster.properties['point_count'] % this.clusterEventsCount : this.clusterEventsCount);
    }
    console.log('clusterEventsOffset: ', this.clusterEventsOffset);
    this.getClusterPoints(this.selectedCluster.properties['cluster_id'], this.clusterEventsCount, this.clusterEventsOffset)
  }

  private getClusterPoints(clusterId: number, pointCount: number, offset: number): void {
    this.geoJSONSource.getClusterLeaves(clusterId, pointCount, offset)
      .then((points) => this.selectedClusterPoints.set({
        clusterData:points,
        clusterMetaData: {totalEventsCount: this.selectedCluster.properties['point_count'],
          eventsCount: this.clusterEventsCount,
          eventsOffset: this.clusterEventsOffset}
        }))
  }

}
