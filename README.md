# Lamar

A Cloudflare Worker that will keep an eye on a Steam account's in-game status, and post to a Discord Channel when the game is quit.

For instance, it will notify GTA passive idle players if GTA has crashed.

## Run Your Own

See [SETUP.md](https://github.com/bachmacintosh/lamar/blob/main/SETUP.md) for info on how to set up this bot on your own Discord account.

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
npm run check-types
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
