/* eslint-disable @typescript-eslint/naming-convention --
   These are environment variables, and must be in SCREAMING_SNAKE_CASE
*/
export default interface Env {
	DISCORD_BOT_TOKEN: string;
	DISCORD_CHANNEL_ID: string;
	DISCORD_MENTION_USER_ID: string;
	DISCORD_PUBLIC_KEY: string;
	KV: KVNamespace;
	STEAM_API_KEY: string;
	STEAM_ID: string;
}
