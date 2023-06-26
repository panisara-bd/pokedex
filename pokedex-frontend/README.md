# pokedex-frontend

## Development

This project is built using [Remix](https://remix.run/) and [Tailwind CSS](https://tailwindcss.com/) for styling. It is designed for both dark and light mode.

To run the Remix app locally, make sure the project's local dependencies are installed:

```sh
npm install
```

Afterwards, start the Remix development server like so:

```sh
npm run dev
```

## Deployment

The recommended way to deploy this is using [Vercel](https://vercel.com/), since the loaders and actions are designed to be ran as Vercel Serverless Functions.

Make sure to set up the `BACKEND_BASE_URL`, which should equal to the host of the deployed pokedex-backend. Example: https://pokedex-backend.example.com:8123.