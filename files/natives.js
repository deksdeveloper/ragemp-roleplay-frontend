﻿

global.GTA_VER = 10;
global.getNative = function (name) {
	return NATIVES[name][GTA_VER];
};
//mp.events.callRemote("checkVersion", GTA_VER);
/*TYPE:
1 = HealKey
2 = Flyhack/Teleport
3 = Vehicle Flyhack/Teleport
*/

global.NATIVES = {
	"SET_BLIP_SPRITE": { 10: '0xDF735600A4696DAF', 0: '0x3B815A6E8530D3A5', 1: '0xDC0EBFC7730AA226', 2: '0x4B4040A0EC7DBA81' },
	"SET_BLIP_ALPHA": { 10: '0x45FF974EEE1C8734', 0: '0x18EC814D577B92CE', 1: '0x1DB03C7D3DC49006', 2: '0xF20857E4CB32A2B7' },
	"SET_BLIP_COLOUR": { 10: '0x03D7FB09E75D6B7E', 0: '0xEB934A06DDA5027D', 1: '0x71925FF3194E84CE', 2: '0x0C71C8E276E3EC54' },
	"SET_BLIP_FLASH_TIMER": { 10: '0xD3CD6FD297AE87CC', 0: '0x82F6662608C79359', 1: '0xDAA61FC3AADFAE1D', 2: '0xAA75C45BC4449A40' },
	"SET_BLIP_FLASHES": { 10: '0xB14552383D39CE3E', 0: '0xB989C497205DF6E8', 1: '0xC3BBD8D349129F55', 2: '0x0A8FD2D5529E1737' },
	"SET_BLIP_ROTATION": { 10: '0xF87683CDF73C3F6E', 0: '0x890D3D8F19A923CC', 1: '0xFA3D22639F5AA493', 2: '0xE83839908A240D2E' },
	"REQUEST_ADDITIONAL_COLLISION_AT_COORD": { 10: '0xC9156DC11411A9EA', 0: '0xF48163C4935062E5', 1: '0x199640F55E0F7596', 2: '0x566B32CA90C28D2C' },
	"SET_FOLLOW_PED_CAM_VIEW_MODE": { 10: '0x5A4F9EDF1673F704', 0: '0xBD5C3A8C424D692F', 1: '0xA20353DB1D2AF820', 2: '0x0B51676846D7C57B' },
	"SET_PED_AMMO": { 10: '0x14E56BC5B5DB6A19', 0: '0x02B78A67FD396A42', 1: '0xC8207C41C6D1E3CF', 2: '0xF28A81E331A3F337' },
	"GET_SELECTED_PED_WEAPON": { 10: '0x0A6DB4965674D243', 0: '0x58A62DEC84D1FB6F', 1: '0x6678C142FAC881BA', 2: '0x4D008FF908B623E2' },
	"GIVE_WEAPON_TO_PED": { 10: '0xBF0FD6E56C964FCB', 0: '0xD5D9B48EB10FA2C0', 1: '0x7D154B840BD03D00', 2: '0x9E058151726E58DE' },
	"REMOVE_WEAPON_FROM_PED": { 10: '0x4899CB088EDF59B8', 0: '0x9E47A83BAB72D2C4', 1: '0xA48F593CC7A71FCC', 2: '0xABBEF2EAC74A02EB' },
	"IS_CUTSCENE_ACTIVE": { 10: '0x991251AFC3981F84', 0: '0x9063DC17918D346A', 1: '0x61F9977B378C43BF', 2: '0x6C97EEC6339FB45C' },
	"STOP_CUTSCENE_IMMEDIATELY": { 10: '0xD220BDD222AC4A1E', 0: '0xF51CB58D4AD94B4C', 1: '0xCDA9878BAC5C6D68', 2: '0xCFA828389A0C5B6B' },
	"GET_RANDOM_EVENT_FLAG": { 10: '0xD2D57F1D764117B1', 0: '0x86EEE9A2AEF6EC88', 1: '0xD436A6CEB14BAC66', 2: '0x17E356AF4F930A2C' },
	"SET_RANDOM_EVENT_FLAG": { 10: '0x971927086CFD2158', 0: '0x4FA59397643FB016', 1: '0xD42F50467E7AD46D', 2: '0x980C42B833D07BB4' },
	"GET_MISSION_FLAG": { 10: '0xA33CDCCDA663159E', 0: '0xD532AAF71376B5E8', 1: '0xEFD3E4A202A0D9DA', 2: '0x5A0744D504CC705F' },
	"SET_MISSION_FLAG": { 10: '0xC4301E5121A0ED73', 0: '0xB5533C0C8A2B9BF2', 1: '0x955FF17089AF6072', 2: '0xBC03901A15107317' },
	"REMOVE_ALL_PED_WEAPONS": { 10: '0xF25DF915FA38C5F3', 0: '0xD129A4C59BEB39B8', 1: '0x5FF97B71C576EF53', 2: '0x7346A36E01E18FEC' },
	"GET_AMMO_IN_PED_WEAPON": { 10: '0x015A522136D7F951', 0: '0x63D43044461F40BD', 1: '0x2406A9C8DA99D3F4', 2: '0x5088CF774DF6D935' },
	"SET_PED_ENABLE_WEAPON_BLOCKING": { 10: '0x97A790315D3831FD', 0: '0x24DF497566EDB1F0', 1: '0xBE2214915742A0E8', 2: '0x368E58752384E0B4' },
	"SET_PED_CAN_SWITCH_WEAPON": { 10: '0xED7F7EFE9FABF340', 0: '0x00663E123FCB5041', 1: '0xC6F259731E10AFA1', 2: '0xA65C9B02EE3596FE' },
	"MAKE_PED_RELOAD": { 10: '0x20AE33F3AC9C0033', 0: '0xB984E4455645D862', 1: '0x480C8F4C533B9748', 2: '0x3B920C528B54FB5F' },
	"_SET_VEHICLE_ENGINE_POWER_MULTIPLIER": { 10: '0x93A3996368C94158', 0: '0x5F850CC79999947A', 1: '0xF1E9E4CBA77681D3', 2: '0x28C3B4214877233A' },
	"_SET_VEHICLE_ENGINE_TORQUE_MULTIPLIER": { 10: '0xB59E4BD37AE292DB', 0: '0x3CFE09CFEB536C3D', 1: '0x33C9D0B39210B35E', 2: '0xF4A0FCE96487A10B' },
}
