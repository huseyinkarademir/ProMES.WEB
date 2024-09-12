import baseUrl from './urls'

export let environment = {
    production: false,
    localRoute: false,
    apiLocal: 'https://localhost/{{api}}.API',
    api: {...baseUrl},
    apiBaseUrl: 'https://localhost:7178/api',  // Temel API URL'i
    environment: 'DEV'
  };