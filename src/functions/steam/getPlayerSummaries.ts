import type { Env, SteamUserInfo } from "../../types";

export default async function getPlayerSummaries(env: Env): Promise<SteamUserInfo> {
	const url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${env.STEAM_API_KEY}&steamids=${env.STEAM_ID}`;
	const init: RequestInit = {
		method: "GET",
	};
	const response = await fetch(url, init);
	if (response.ok) {
		const text = await response.text();
		const info = JSON.parse(text) as SteamUserInfo;
		return info;
	} else {
		throw new Error(`Steam API threw HTTP error ${response.status}`);
	}
}
