# Lamar

A Cloudflare Worker that will keep an eye on a Steam account's in-game status, and post to a Discord Channel when the game is quit.

For instance, it will notify GTA passive idle players if GTA has crashed.

## Run Your Own

### 0. Prerequisites

Before using this bot, you will need:

- A Discord Account
- [Your Steam64 ID](https://steamid.xyz/)
- A [Steam Web API Key](https://steamcommunity.com/dev/apikey)
- Familiarity with Discord Bots, and some knowledge of the Discord API regarding Application Commands

If you haven't already, enable Developer Mode in Discord to let you get IDs from users/channels/etc. in the client; go to Settings, Advanced, and toggle on Developer Mode.

### 1. Create The Bot

Create a new Application in the [Discord Developer Portal](https://discord.com/developers/applications), and create a Bot under its Bot settings. Generate a new Bot Token on the same page, and **save it for later as it won't be shown again**.

### 2. Add to Your Server

Still in the Developer Portal under your Bot, navigate to OAuth2 and click on the URL Generator. Under Scopes, check `bot`, and then click Copy next to the URL provided below. Open a new browser tab, paste the URL, and pick which server to deploy the bot to.

⚠️ **This bot was designed to post updates to its own channel, and deletes old messages every 12 hours.** It's highly recommended the bot be given its own private channel with the following permissions:

- View Channel
- Send Messages
- Manage Messages
- Read Message History

### 3. Deploy to Cloudflare Workers

This handy button will have Cloudflare walk you through getting the worker set up. It will fork this repo, ask for your Account ID and an API Key, will have you enable the provided GitHub Actions, and then add/deploy the Worker to your Cloudflare account.

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/bachmacintosh/lamar)

### 4. Configure The Environment

In the [Cloudflare Dashboard](https://dash.cloudflare.com/), head to Workers and into your newly created `lamar` Worker. Head to Variables under the Settings tab, and add the following required environment variables:

- `DISCORD_BOT_TOKEN` - The Bot Token you noted down earlier
- `DISCORD_CHANNEL_ID` - Pick a channel on the server you added the bot to. Right-click it, and choose Copy ID; paste the value here.
- `DISCORD_MENTION_USER_ID` - Find the user in the server's member list who should be mentioned when a game quits. Right-click and choose Copy ID; paste it here.
- `DISCORD_PUBLIC_KEY` - Found in the Developer Portal under your bot's General Information page
- `STEAM_ID` - Your Steam64 ID

### 5. Register Commands

You should use [Postman](https://www.postman.com/) or `curl` to make this API call from your computer; many online services are blocked by Cloudflare from hitting the Discord API..

Create a request with the following info:

- Method: POST
- URL: https://discord.com/api/v10/applications/{{applicationId}}/guilds/{{guildId}}/commands

You can get your bot's Application ID from the Devloper Portal, and the Guild ID by right-clicking the name of the server the bot joined and choosing Copy ID.

So if you Application ID were 123, and your Guild ID were 456, the URL would look like:

https://discord.com/api/v10/applications/123/guilds/456/commands

Set the Authorization header to `Bot <your-bot-token>`. You'll need to do this under the Headers tab in Postman, not Authorization.

For the Request Body, copy the JSON found in this repository's `commands.json` file.

Submit the request. You should either get a `201 Created` if this is the first time registering commands on this bot, or a `200 OK` if this is an upsert.

### 6. Enable HTTP Interactions

Back in the Cloudflare Dashboard, copy the URL listed under the Worker's Routes at the top; it should look like http://lamar.user.workers.dev .

Back in the Discord Developer Portal, under the General Information page for your bot, paste that URL into the Interaction Endpoint URL field, and save your changes. If everything's configured properly, you should see a success message. Discord will now send any interactions, such as commands, to the Cloudflare Worker.

## Development

### Useful Commands

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

### Contributing

Please see [SECURITY.md](https://github.com/bachmacintosh/lamar/blob/main/SECURITY.md) for reporting security vulnerabilities, and [CONTRIBUTING.md](https://github.com/bachmacintosh/lamar/blob/main/CONTRIBUTING.md) for all other contributions to the Project. All contributions should be made in line with our [Code of Conduct](https://github.com/bachmacintosh/lamar/blob/main/CODE_OF_CONDUCT.md). Thank You!
