import type { Env, LamarConfig } from "../../types";

export default async function getConfig(env: Env): Promise<LamarConfig> {
	const kvString = await env.KV.get("config");
	if (kvString === null) {
		const defaultConfig: LamarConfig = {
			status: "stopped",
			dialog: "standard",
			verbose: false,
		};
		await env.KV.put("config", JSON.stringify(defaultConfig));
		return defaultConfig;
	} else {
		return JSON.parse(kvString) as LamarConfig;
	}
}
