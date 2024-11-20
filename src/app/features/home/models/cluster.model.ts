export interface ClusterMetadata{
  totalEventsCount: number;
  eventsCount: number;
  eventsOffset: number;
}

export interface Cluster {
  clusterData: GeoJSON.Feature[];
  clusterMetaData: ClusterMetadata
}
