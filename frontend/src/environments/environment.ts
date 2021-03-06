// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  title: 'app.title',
  version: '0.1',
  production: false,
  apiUrlBase: 'http://localhost:8081/',
  mapsApiKey: 'AIzaSyDwKqTBI--pCduw-6MM6nKDCqsii55beTU',
  page: {
    limit: 5,
    gap: 4
  },
  dateFormat: 'dd/MM/yyyy',
  language: {
    key: 'locale',
    default: 'fr'
  },
};
