import type {
	APIChatInputApplicationCommandInteraction,
	APIEmbed,
	APIInteraction,
	APIInteractionResponsePong,
	RESTPostAPIChannelMessageJSONBody,
	RESTPostAPIInteractionCallbackJSONBody,
	RESTPostAPIWebhookWithTokenJSONBody,
} from "./discord/index";
import type Env from "./cloudflare/Env";
import type SteamUserInfo from "./steam/SteamUserInfo";

interface LamarConfig {
	status: "running" | "stopped";
	verbose: boolean;
}

export type {
	Env,
	APIChatInputApplicationCommandInteraction,
	APIEmbed,
	APIInteraction,
	APIInteractionResponsePong,
	LamarConfig,
	RESTPostAPIChannelMessageJSONBody,
	RESTPostAPIInteractionCallbackJSONBody,
	RESTPostAPIWebhookWithTokenJSONBody,
	SteamUserInfo,
};
