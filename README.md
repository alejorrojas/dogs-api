<img src="https://raw.githubusercontent.com/alejorrojas/DogsDeck/master/client/src/assets/Header.png"/>

# dogs-api
An API based on the [Dogs API](https://thedogapi.com/) ๐

๐ See the client side integration on [Dogs Deck](https://dogs-deck.vercel.app/)

## Features ๐ถ
- POST
- DELETE
- GET (all, id, name)
- Filters

## Endpoints ๐
```js
 http://localhost:3000/api/dogs
```
```js
 http://localhost:3000/api/temperaments
```

## Run Locally ๐งช

Clone the project

```bash
  git clone https://github.com/alejorrojas/dogs-api
```

Install dependencies

```bash
  npm install
```

In order to start the app in the development mode:

```bash
  npm run dev
```
This will start the watch mode and build the project to Common JS ๐

Open http://localhost:3000/api to view it in the browser.

## Environment Variables โ

To run this project, you will need to add the following environment variables to your .env file, all related to a PostgreSQL database

`DB_NAME`
`DB_HOST`
`DB_PORT`
`DB_USER`
`DB_PASSWORD`


