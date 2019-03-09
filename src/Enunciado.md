# Videoteca
El objetivo de la práctica es crear una aplicación con la que gestionar nuestras películas favoritas como colecciones.

## Arquitectura
Para obtener los datos de películas, utilizaremos el api de
https://developers.themoviedb.org/3

La aplicación guardará en localStorage las colecciones del usuario y las puntuaciones que cada pelicula tenga dentro de cada colección.

La interfaz de la aplicación deberá realizarse con React.

## Funcionalidad
- Permitirá al usuario buscar directamente (/search/movie) películas para añadirlas a cada colección.
- A parte, la propia aplicación ofrecerá una lista de sugerencias de películas populares (usando el endpoint /discover/movie?sort_by=popularity.desc) que también podrán añadirse a las colecciones del usuario.
- El usuario debe poder valorar las películas de su colección dando una puntuación a cada una.
- Podrá crear tantas colecciones como desee, y podrá modificarlas añadiendo o eliminando películas.
- También habrá una vista de detalle de cada película en la que mostrar directamente los datos de la misma obtenidos del API de themoviedb.

PATH1:
`https://api.themoviedb.org/3/discover/movie?api_key=e68728e1e31dcda82f7b2b896f0c47be&language=es&sort_by=popularity.desc`

PATH2:
`https://api.themoviedb.org/3/discover/movie?api_key=e68728e1e31dcda82f7b2b896f0c47be&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false`

PATH3 (with Page PARAM):
`https://api.themoviedb.org/3/discover/movie?api_key=e68728e1e31dcda82f7b2b896f0c47be&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=2`

BASE URL IMAGE: 
`https://image.tmdb.org/t/p/w500`
PATH IMAGE:
`http://image.tmdb.org/t/p/w300/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg`

`
{
"vote_count": 623,
"id": 299537,
"video": false,
"vote_average": 7.2,
"title": "Capitana Marvel",
"popularity": 424.292,
"poster_path": "/d3p5JuwN7dG0TvrN5h4ZY4tMOEX.jpg",
"original_language": "en",
"original_title": "Captain Marvel",
"genre_ids": [
28,
12,
878
],
"backdrop_path": "/w2PMyoyLU22YvrGK3smVM9fW1jj.jpg",
"adult": false,
"overview": "La historia sigue a Carol Danvers mientras ella se convierte en uno de los héroes más poderosos del universo cuando la Tierra se encuentre atrapada en medio de una guerra galáctica entre dos razas alienígenas. Situada en los años 90, Captain Marvel es una historia nueva de un período de tiempo nunca antes visto en la historia del Universo Cinematográfico de Marvel.",
"release_date": "2019-03-06"
}
`