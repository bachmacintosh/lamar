# Lamar

A Cloudflare Worker that will keep an eye on a Steam account's in-game status, and post to a Discord Channel when the game is quit.

For instance, it will notify GTA passive idle players if GTA has crashed.

## Run Your Own

Create a Bot on Discord, add it to your desired server, and pick a channel for it to post in. The bot should be able to send messages, manage messages, and read the message history in that channel to clean up previous messages.

Set up a `dev.vars` file in the project root after cloning the repo. Set your environment variables per `./src/types/cloudflare/Env.ts`. This will let you test the bot in development.

Install dependencies:

```shell
npm install
```

Make sure you're logged into Wrangler:

```shell
npx wrangler whoami
```

Check Types:

```shell
npm run check types
```

Check for problems, and optionally, fix them:

```shell
npm run lint
```

```shell
npm run lint:fix
```

Publish to Cloudflare Workers:

```shell
npm run publish
```

Make sure to set the same environment variables using either `npx wrangler secret put` or through the Cloudflare Dashboard.
