# Filmica - React

-------------------------------------------------------------------------------

## Installation

Install dependencies with:

```shell
npm install
```

-------------------------------------------------------------------------------

## Start the APP

To start the application in production mode use:

### Development

To start the application in development mode use:

```shell
npm start
```

**Note: This should open a new tab in your browser pointing to Base URL**

### Production

To start the application in production mode use:

```shell
npm run build
```

### Eject

To eject the application you can use:

```shell
npm run eject
```

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**
If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

-------------------------------------------------------------------------------

## APP Documentation

### Base URL

To go to the base URL, you can use:

[http://localhost:3000/](http://localhost:3000/)


### User Login

[http://localhost:3000/login](http://localhost:3000/login)

You can login with any of the following users provided by the URL below. All you need todo is to introduce the login.username and login.passworld.

[https://randomuser.me/api?seed=abc&results=100](https://randomuser.me/api?seed=abc&results=100)

 When you are logged, you can add movies to favorite list and add rating to each movie from detail view.

**Note: Anyway, if you don´t login, you will be able to continue using the app**


### Film list

[http://localhost:3000](http://localhost:3000)

Here is shown a list of movies to discover.


### Favorite list

[http://localhost:3000/favorites](http://localhost:3000/favorites)

All movies saved as favorites by the logged user are shown here. If you aren't logged or you don't have favorites movies, this list will appear empty.


### Searching

[http://localhost:3000/search](http://localhost:3000/search)

Here you can search any movie that you want to know something about.


### Detail view of the movie

http://localhost:3000/detail/MovieID

This view shows the data of the movie: poster, backdrop, overview, release date, genres and it also allows you to add a rating note.

-------------------------------------------------------------------------------

## API - THE MOVIE DATABASE (TMDB)

All movies shown in the application are provided by the API: [The Movie Database](https://www.themoviedb.org).

-------------------------------------------------------------------------------

## API - DESIGN

Below is shown a design of what it should look like in your browser.

![Filmica](screenshotFilmica.png?raw=true "Filmica")
