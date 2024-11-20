export interface Event{
  identifiant:string;
  nom_generique:string | null;
  nom_de_la_manifestation:string;
  descriptif_court:string;
  descriptif_long:string;
  date_debut:string;
  date_fin:string;
  horaires:string | null;
  dates_affichage_horaires:string;
  modification_derniere_minute:string | null;
  lieu_nom:string;
  lieu_adresse_1:string | null;
  lieu_adresse_2:string | null;
  lieu_adresse_3:string | null;
  code_postal:number;
  commune:string;
  type_de_manifestation:string;
  categorie_de_la_manifestation:string;
  theme_de_la_manifestation:string | null;
  station_metro_tram_a_proximite:string | null;
  googlemap_latitude:number;
  googlemap_longitude:number;
  reservation_telephone:string | null;
  reservation_email:string | null;
  reservation_site_internet:string | null;
  manifestation_gratuite:string | null;
  tarif_normal:string | null;
  tarif_enfant:string | null;
  tranche_age_enfant:string | null;
  geo_point:number[];
}

export interface Events{
  total_count: number;
  results: Event[];
}
