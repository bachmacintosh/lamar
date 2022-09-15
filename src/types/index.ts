import type {
	APIChatInputApplicationCommandInteraction,
	APIEmbed,
	APIInteraction,
	APIInteractionResponsePong,
	RESTGetAPIChannelMessagesResult,
	RESTPostAPIChannelMessageJSONBody,
	RESTPostAPIChannelMessagesBulkDeleteJSONBody,
	RESTPostAPIInteractionCallbackJSONBody,
	RESTPostAPIWebhookWithTokenJSONBody,
} from "./discord/index";
import type Env from "./cloudflare/Env";
import type SteamUserInfo from "./steam/SteamUserInfo";

interface LamarConfig {
	status: "running" | "stopped";
	dialog: LamarDialog;
	verbose: boolean;
}

type LamarDialog = "lamar" | "standard";

interface LamarPhrases {
	alreadyRunning: string;
	alreadyStopped: string;
	alreadyQuiet: string;
	alreadyVerbose: string;
	nowCurrentDialog: string;
	nowRunning: string;
	nowStopped: string;
	nowQuiet: string;
	nowVerbose: string;
	notificationPhrases: [string, ...string[]];
}

export type {
	Env,
	APIChatInputApplicationCommandInteraction,
	APIEmbed,
	APIInteraction,
	APIInteractionResponsePong,
	LamarConfig,
	LamarDialog,
	LamarPhrases,
	RESTPostAPIChannelMessageJSONBody,
	RESTGetAPIChannelMessagesResult,
	RESTPostAPIChannelMessagesBulkDeleteJSONBody,
	RESTPostAPIInteractionCallbackJSONBody,
	RESTPostAPIWebhookWithTokenJSONBody,
	SteamUserInfo,
};
