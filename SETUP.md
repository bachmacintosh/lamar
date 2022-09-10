# Run Your Own Lamar Bot

## 0. Prerequisites

Before using this bot, you will need:

- A Discord Account
- [Your Steam64 ID](https://steamid.xyz/)
- A [Steam Web API Key](https://steamcommunity.com/dev/apikey)
- Familiarity with Discord Bots, and some knowledge of the Discord API regarding Application Commands

If you haven't already, enable Developer Mode in Discord to let you get IDs from users/channels/etc. in the client; go to Settings, Advanced, and toggle on Developer Mode.

## 1. Create Bot

Create a new Application in the [Discord Developer Portal](https://discord.com/developers/applications), and create a Bot under its Bot settings. Generate a new Bot Token on the same page, and **save it for later as it won't be shown again**.

## 2. Add to Your Server

Still in the Developer Portal under your Bot, navigate to OAuth2 and click on the URL Generator. Under Scopes, check `bot`, and then click Copy next to the URL provided below. Open a new browser tab, paste the URL, and pick which server to deploy the bot to.

⚠️ **This bot was designed to post updates to its own channel, and deletes old messages every 12 hours.** It's highly recommended the bot be given its own private channel with the following permissions:

- View Channel
- Send Messages
- Manage Messages
- Read Message History

Make sure you grant the bot's command permissions to the appropriate server member(s).

## 3. Configure KV Namespaces

In the [Cloudflare Dashboard](https://dash.cloudflare.com/), head to Workers, and click on KV.

Add two new KV namespaces. I recommend calling them `Lamar` and `Lamar (Testing)`. Make note of their Namespace IDs; they'll be needed to configure the bot so it will deploy to Cloudflare properly.

## 4. Deploy Worker

Clone the repository to a folder of your choosing, and install dependencies.

```shell
npm install
```

You'll need to make sure you're logged into Cloudflare in the Wrangler CLI.

```shell
npx wrangler whoami
```

Once logged in, edit the `wrangler.toml` file by replacing the existing KV Namespace IDs with the two you created earlier. The `id` should be your production namespace ID, and `preview_id` for the testing namespace.

Finally, deploy the worker to Cloudflare.

```shell
npm run publish
```

The worker will error out until its environment is configured.

## 5. Configure Deployed Worker

Head to Variables under the Settings tab in the Cloudflare Dashboard, and add the following required environment variables:

- `DISCORD_BOT_TOKEN` - The Bot Token you noted down earlier
- `DISCORD_CHANNEL_ID` - Pick a channel on the server you added the bot to. Right-click it, and choose Copy ID; paste the value here.
- `DISCORD_MENTION_USER_ID` - Find the user in the server's member list who should be mentioned when a game quits. Right-click and choose Copy ID; paste it here.
- `DISCORD_PUBLIC_KEY` - Found in the Developer Portal under your bot's General Information page
- `STEAM_ID` - Your Steam64 ID

## 6. Register Commands

You should use [Postman](https://www.postman.com/) or `curl` to make this API call from your computer; many online services are blocked by Cloudflare from hitting the Discord API..

Create a request with the following info:

- Method: POST
- URL: `https://discord.com/api/v10/applications/{{applicationId}}/guilds/{{guildId}}/commands`

You can get your bot's Application ID from the Devloper Portal, and the Guild ID by right-clicking the name of the server the bot joined and choosing Copy ID.

So if you Application ID were 123, and your Guild ID were 456, the URL would look like:

`https://discord.com/api/v10/applications/123/guilds/456/commands`

Set the Authorization header to `Bot {{botToken}}`. You'll need to do this under the Headers tab in Postman, not Authorization.

For the Request Body, copy the JSON found in this repository's [commands.json](https://github.com/bachmacintosh/lamar/blob/main/commands.json) file.

Submit the request. You should either get a `201 Created` if this is the first time registering commands on this bot, or a `200 OK` if this is an upsert.

## 7. Enable HTTP Interactions

Back in the Cloudflare Dashboard, copy the URL listed under the Worker's Routes at the top; it should look like http://lamar.user.workers.dev .

Back in the Discord Developer Portal, under the General Information page for your bot, paste that URL into the Interaction Endpoint URL field, and save your changes. If everything's configured properly, you should see a success message. Discord will now send any interactions, such as commands, to the Cloudflare Worker.

## 8. Manage Bot

You can start and stop the notifications, check the configuration status of the bot, and change if it's verbose (reports all game statuses every 10 minutes) or quiet (only send a message when status changes). Type `/lamar` into chat to see all the commands and what they do.
