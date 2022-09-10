import type {
	APIChatInputApplicationCommandInteraction,
	Env,
	RESTPostAPIInteractionCallbackJSONBody,
} from "../../types";
import { InteractionResponseType } from "../../const/discord/ourAPIVersion";
import dialog from "../../const/dialog";
import getConfig from "../cloudflare/getConfig";
import respondToCommand from "./respondToCommand";
import setConfig from "../cloudflare/setConfig";

export default async function handleCommand(
	env: Env,
	command: APIChatInputApplicationCommandInteraction,
): Promise<void> {
	if (command.data.name === "lamar" && typeof command.data.options !== "undefined" && command.data.options.length > 0) {
		if (command.data.options[0].name === "dialog") {
			const config = await getConfig(env);
			if (config.dialog === "standard") {
				config.dialog = "lamar";
			} else {
				config.dialog = "standard";
			}
			await setConfig(env, config);
			const message: RESTPostAPIInteractionCallbackJSONBody = {
				type: InteractionResponseType.ChannelMessageWithSource,
				data: {
					content: dialog[config.dialog].nowCurrentDialog,
				},
			};
			await respondToCommand(env, command.id, command.token, message);
		} else if (command.data.options[0].name === "quiet") {
			const config = await getConfig(env);
			if (config.verbose) {
				config.verbose = false;
				await setConfig(env, config);
				const message: RESTPostAPIInteractionCallbackJSONBody = {
					type: InteractionResponseType.ChannelMessageWithSource,
					data: {
						content: dialog[config.dialog].nowQuiet,
					},
				};
				await respondToCommand(env, command.id, command.token, message);
			} else {
				const message: RESTPostAPIInteractionCallbackJSONBody = {
					type: InteractionResponseType.ChannelMessageWithSource,
					data: {
						content: dialog[config.dialog].alreadyQuiet,
					},
				};
				await respondToCommand(env, command.id, command.token, message);
			}
		} else if (command.data.options[0].name === "start") {
			const config = await getConfig(env);
			if (config.status === "running") {
				const message: RESTPostAPIInteractionCallbackJSONBody = {
					type: InteractionResponseType.ChannelMessageWithSource,
					data: {
						content: dialog[config.dialog].alreadyRunning,
					},
				};
				await respondToCommand(env, command.id, command.token, message);
			} else {
				config.status = "running";
				await setConfig(env, config);
				const message: RESTPostAPIInteractionCallbackJSONBody = {
					type: InteractionResponseType.ChannelMessageWithSource,
					data: {
						content: dialog[config.dialog].nowRunning,
					},
				};
				await respondToCommand(env, command.id, command.token, message);
			}
		} else if (command.data.options[0].name === "status") {
			const config = await getConfig(env);
			let configuredDialog = "in a standard fashion";
			if (config.dialog === "lamar") {
				configuredDialog = "like Lamar from Grand Theft Auto V";
			}
			const message: RESTPostAPIInteractionCallbackJSONBody = {
				type: InteractionResponseType.ChannelMessageWithSource,
				data: {
					content: `Bot is ${config.status}, ${
						config.verbose ? "is" : "is not"
					} being verbose, and speaks ${configuredDialog}.`,
				},
			};
			await respondToCommand(env, command.id, command.token, message);
		} else if (command.data.options[0].name === "stop") {
			const config = await getConfig(env);
			if (config.status === "stopped") {
				const message: RESTPostAPIInteractionCallbackJSONBody = {
					type: InteractionResponseType.ChannelMessageWithSource,
					data: {
						content: dialog[config.dialog].alreadyStopped,
					},
				};
				await respondToCommand(env, command.id, command.token, message);
			} else {
				config.status = "stopped";
				await setConfig(env, config);
				const message: RESTPostAPIInteractionCallbackJSONBody = {
					type: InteractionResponseType.ChannelMessageWithSource,
					data: {
						content: dialog[config.dialog].nowStopped,
					},
				};
				await respondToCommand(env, command.id, command.token, message);
			}
		} else if (command.data.options[0].name === "verbose") {
			const config = await getConfig(env);
			if (config.verbose) {
				const message: RESTPostAPIInteractionCallbackJSONBody = {
					type: InteractionResponseType.ChannelMessageWithSource,
					data: {
						content: dialog[config.dialog].alreadyVerbose,
					},
				};
				await respondToCommand(env, command.id, command.token, message);
			} else {
				config.verbose = true;
				await setConfig(env, config);
				const message: RESTPostAPIInteractionCallbackJSONBody = {
					type: InteractionResponseType.ChannelMessageWithSource,
					data: {
						content: dialog[config.dialog].nowVerbose,
					},
				};
				await respondToCommand(env, command.id, command.token, message);
			}
		}
	}
}
