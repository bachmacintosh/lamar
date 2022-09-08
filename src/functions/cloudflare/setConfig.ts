import type { Env, LamarConfig } from "../../types";

export default async function setConfig(env: Env, config: LamarConfig): Promise<void> {
	await env.KV.put("config", JSON.stringify(config));
}
