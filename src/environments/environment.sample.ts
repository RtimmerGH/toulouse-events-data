//create an environment.development.ts with your env variables for local development
//production environment file is created when the app is built based on variable in the .env file
export const environment = {
  production: false,
  tlseApiURL: 'https://data.toulouse-metropole.fr/api/explore/v2.1/catalog/datasets/agenda-des-manifestations-culturelles-so-toulouse/records',
  mapTilerURL:'https://api.maptiler.com/maps/openstreetmap/style.json',
  mapTilerKEY: 'YOUR_KEY_HERE',
  appVersion: '0.0.0',
};
