# pokedex

## Features
This is a simple Pokédex application which allows you to search for a Pokémon by its name (including partial name) and id.

You also have the possibility to create an account. You can use this to like certain Pokémons, and you can see your liked Pokémons every time you log in.

You will also get notifications each time other people like the same Pokémons you do.

Since this is a simple project and it doesn't receive a huge amout of traffic, the goal of the project was to get an MVP and a lot of decisions were based on this.

## Demo
You can try out a live demo of the app [here](https://pokedex-pani.vercel.app/).

## Structure
The project is structured into two parts, pokedex-backend and pokedex-frontend, each with its own directory.

### Backend
The backend is using [Payload CMS](https://payloadcms.com/) for managing the users, pokémons, likes and notifications.

For more informations on how to get it up and running, check out the README.md file in the pokedex-backend folder.

### Frontend
The frontend is built using [Remix](https://remix.run/). It uses the Vercel Serverless Functions for running the server side bits (loaders and actions). For styling, it is using [Tailwind CSS](https://tailwindcss.com/), which allows quick styling without having to write a lot of CSS.

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.