# pokedex-backend

This project was created using create-payload-app using the blank template.

## How to Use

### Setting up environment

In order to use the application, you need to have a MongoDB database set up. You can use either the mongo image included in the docker-compose.yml file or set one up with [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

The application requires certain environment variables. You can either load them in your shell, or you can add them to a `.env` file at the root of the pokedex-backend directory. An example of the `.env` file with the necessary environment variables:

```sh
MONGODB_URI=mongodb://user:pass@host/db
PAYLOAD_SECRET=0a1b2c3d4e5f6
SERVER_URL=http://localhost:3000
PORT=3000
```

### Seeding Pokémons data
The Pokémons data is seeded using the [PokéAPI](https://pokeapi.co). In order to start the seeding, run `npm run seed:pokemons`. Make sure the previous step (setting up the environment) was ran first.

### Running the server
In order to run the server in development mode (which includes hot reloading), run `npm run dev`.

Otherwise, you can run `npm run build` and `npm run serve` to start it in production mode.