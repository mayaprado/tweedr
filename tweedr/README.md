# Welcome to the Tweedr API!!

To get the Tweedr API set up, you know the drill.

- Install dependencies
- Create database (`tweedr_dev`)
- Run seed & migration
- Start the server!

## Connecting Tweedr 2.0 to React

1. Run `createdb tweedr_dev` from the terminal. This will create the database that the tweedr express app is set up to use.
2. Run `psql -d tweedr_dev -f migration_05192017.sql` from migration directory of the `tweedr` Express app.
3. Run `psql -d tweedr_dev -f seed.sql` from the seed directory of the `tweedr` Express app.
4. From `tweedr` directory, which is the Express app, run `npm install`.
5. From the `tweedr` directory, run `create-react-app client`. This will create a new directory `client` with a react app in it. (It's convention to name the front-end portion of a full-stack build `client`.)
6. Now, when you want to begin hacking, run `npm start` from the `tweedr` directory to start the Express app, and run `npm start` from the `tweedr/client` directory (in a new terminal tab) to start the React app.

Good luck!

## Endpoints aka your API Reference

### GET `/api/tweeds`

Returns all tweeds in database.

```json
{
"message": "ok",
  "data": {
    "tweeds": [
      {
        "id": "1",
        "tweed": "Hello World!",
        "tweed_time": "1494788500041"
      },
      {
        "id": "2",
        "tweed": "I love using Tweedr... so much better than twitter.",
        "tweed_time": "1494788543350"
      },
      {
        "id": "3",
        "tweed": "React is the best!",
        "tweed_time": "1494788564011"
      },
      {
        "id": "4",
        "tweed": "testing tweed upload",
        "tweed_time": "1494792188509"
      }
    ]
  }
}
```

### GET `/api/tweeds/:id`

Returns information about one specific tweed.

```json
{
  "message": "ok",
  "data": {
    "tweed": {
      "id": "1",
      "tweed": "Hello World!",
      "tweed_time": "1494788500041"
    }
  }
}
```

### POST `/api/tweeds`

Adds a tweed to the database. Request body **must include** a `tweed` property.

A sample response looks like this:

```json
{
  "message": "ok",
  "data": {
    "tweed": {
      "id": "5",
      "tweed": "makin that tweed",
      "tweed_time": "1494793073028"
    }
  }
}
```

(The time is created in the controller.)

### PUT `/api/tweeds/:id`

Edits a tweed in the database, based on that tweed's ID in the database. Request body **must include** a `tweed` property.

A sample response looks like this:

```json
{
  "message": "ok",
  "data": {
    "tweed": {
      "id": "5",
      "tweed": "this tweed has been edited",
      "tweed_time": "1494793073028"
    }
  }
}
```


### DELETE `/api/tweeds/:id`

Remove a tweed from the database, based on that tweed's ID in the database.

The response looks like this:

```json
{
  "message": "tweed deleted"
}
```