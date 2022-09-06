export default interface SteamUserInfo {
	response: {
		players: SteamPlayer[];
	};
}

interface SteamPlayer {
	steamid: string;
	personaname: string;
	profileurl: string;
	avatar: string;
	avatarmedium: string;
	avatarfull: string;
	avatarhash: string;
	personastate: PersonaStates;
	personastateflags?: number;
	communityvisibilitystate: CommunityVisibilityStates;
	profilestate?: 1;
	lastlogoff: number;
	commentpermission?: 1;
	realname?: string;
	accountname?: string;
	primaryclanid?: string;
	timecreated?: number;
	gameid?: number;
	gameserverip?: string;
	gameextrainfo?: string;
	loccountrycode?: string;
	locstatecode?: string;
	loccityid?: number;
}

type CommunityVisibilityStates = 1 | 3;

type PersonaStates = 0 | 1 | 2 | 3 | 4 | 5 | 6;
