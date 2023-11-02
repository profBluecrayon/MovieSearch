# README

**_ Please use the following app link (already setup for you): [www.moviesearch.railway.app](https://moviesearch-production-62dd.up.railway.app/) _**

#### Details

2000-2020 movie search app.
Please note that all searches are case-sensitive.
Searches will only show top 10 searches and are indexed by title.
To avoid any self-setup, please use the provided link to test the app.
Built on create-react-app for simplicity.

#### Current Todo-List

- simplify updates after async requests
- find alternative to adding secrets in environment vars
- cache searches results on client
- update themovieAPI to v4 and fetch corresponding types, should be generated from [swagger page](https://thetvdb.github.io/v4-api/#/Artwork/getArtworkBase)
- create hook to infer useLocation() state types based on current page

#### Later Todo-List (not really necessary since not enough services/complexity that need to be managed)

- add language support (i18n-js)
- add redux
- add feature flags
- add seperate environment to differentiate between dev/prod
