# pokedex-backend

This project was created using create-payload-app using the blank template.

## How to Use

`npm run dev` will start up your application and reload on any changes.

### Docker

If you have docker and docker-compose installed, you can run `docker-compose up`

To build the docker image, run `docker build -t my-tag .`

Ensure you are passing all needed environment variables when starting up your container via `--env-file` or setting them with your deployment.

The necessary env vars are `MONGODB_URI`, `PAYLOAD_SECRET`, `PAYLOAD_CONFIG_PATH`, `SERVER_URL` and `PORT`. Example:

```
MONGODB_URI=mongodb://user:pass@host/db
PAYLOAD_SECRET=0a1b2c3d4e5f6
SERVER_URL=http://localhost:3000
PORT=3000
```

`docker run --env-file .env -p 3000:3000 my-tag`
