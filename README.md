# GameZone

GameZone is an app that uses the API of RAWG Video Games Database to display informations about video games.

I used [RapidAPI](https://rapidapi.com/accujazz/api/rawg-video-games-database) as a ressource to get the API key and the endpoints. I used superagent to make the API calls.

I initially wanted to use Sass as a CSS Pre-processor, but the learning scope of this project was already wide, and I decided to focus on a proper implementation of Vue and Typescript

## Personal feedback - Points to improve

- Variables and functions' name : Some of the name that I used may 
- Implementation of the watchers for the dynamic change of the routes : I went with the option of rerendering the GamesList and GameDetails component when the route changed. Reading the [Vue Documentation](https://router.vuejs.org/guide/essentials/dynamic-matching.html#reacting-to-params-changes), it is better to use a watchers to react to params changes
- Sitemap: The dynamic routes are not populated in the sitemap


## Technologies applied

- Vue.js
- Vue-router
- Typescript
- RapidAPI
- Superagent
