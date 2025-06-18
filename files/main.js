
let weapons =
    [
        ["Pistol", 1467525553, 2],
        ["CombatPistol", 403140669, 2],
        ["SNSPistol", 339962010, 2],
        ["HeavyPistol", 1927398017, 2],
        ["VintagePistol", -1124046276, 2],
        ["APPistol", 905830540, 2],
        ["Revolver", 914615883, 2],
        ["Pistol50", -178484015, 2],
        ["Pistol_mk2", -178484015, 2],

        ["CombatPDW", -1393014804, 1],
        ["MicroSMG", -1056713654, 1],
        ["SMG", -500057996, 1],
        ["MiniSMG", -972823051, 1],
        ["MachinePistol", -331545829, 1],
        ["AssaultSMG", -473574177, 1],

        ["Bat", 32653987, 4],
        
        ["PumpShotgun", 689760839, 3],
        ["HeavyShotgun", -1209868881, 3],
        ["AssaultShotgun", 1255410010, 3],
        ["BullpupShotgun", -1598212834, 3],

        ["CarbineRifle", 1026431720, 3],
        ["AssaultRifle", 273925117, 3],
        ["SpecialCarbine", -1745643757, 3],
        ["MarksmanRifle", -1711248638, 3],

        ["rGlove", 335898267, 6],
        ["lGlove", 335898267, 7]
    ];

let offset = new mp.Vector3(0.1, 0.0, 0.0);
let rotation = new mp.Vector3(0.0, 56.0, 0.0);
let player = mp.players.local, street = undefined, zone = undefined;
let frameCount = 0;
let lastTickTime = Date.now();

let dlEnabled = false;
mp.events.add('setVehicleInformation', (status) => {
    dlEnabled = status;
});

var bigmap = [];

bigmap.status = 0;
bigmap.timer = null;

mp.game.ui.setRadarZoom(1.0);
mp.game.ui.setRadarBigmapEnabled(false, false);

let currentFPS = 0;
let lastFrameCount = 0;

for (let weap of weapons) {
    let bone = 0;

    switch (weap[2]) {
        case 0:
            bone = 51826; //"SKEL_R_Thigh";
            offset = new mp.Vector3(0.02, 0.06, 0.1);
            rotation = new mp.Vector3(-100.0, 0.0, 0.0);
            break;
        case 1:
            bone = 58271; //"SKEL_L_Thigh";
            offset = new mp.Vector3(0.08, 0.03, -0.14);
            rotation = new mp.Vector3(-80.77, 0.0, 0.0);
            break;

        case 2:
            bone = 24816; //"SKEL_Spine3";
            offset = new mp.Vector3(-0.08, -0.15, 0.0);
            rotation = new mp.Vector3(180, 155.0, 0.0);
            break;
        case 3:
            bone = 24818; //"SKEL_Spine3";
            offset = new mp.Vector3(-0.0, -0.155, -0.05); // x =(-)Paeen Badan    y=(-) Posht    z= (+) Rast Badan
            rotation = new mp.Vector3(180, 155.5, 0.0); // x=(-)Charkhesh Be Chap    y=(+)Chap Charkhesh(Dayere)    z=(+)Charkhesh Jolo
            break;
        case 5:
            bone = 24818; //"SKEL_Spine3";
            offset = new mp.Vector3(-0.08, -0.15, -0.05);
            rotation = new mp.Vector3(180, 145.0, 0.0);
            break;
        case 4:
            bone = 58271; //"SKEL_Spine3";
            offset = new mp.Vector3(0.08, 0.03, -0.14); // x =(-)Paeen Badan    y=(-) Posht    z= (-) Rast Badan
            rotation = new mp.Vector3(-80.77, 0.0, -90.0); // x=(-)Charkhesh Be Chap    y=(+)Chap Charkhesh(Dayere)    z=(+)Charkhesh Jolo
            break;
        case 6:
            bone = 6286; //"SKEL_Spine3";
            offset = new mp.Vector3(-0.1, 0.0, -0.025); // x =(+)Paeen Badan    y=(-) Posht    z= (+) Rast Badan
            rotation = new mp.Vector3(90.0, -20.0, 90.0); // x=(-)Charkhesh Be Chap    y=(+)Chap Charkhesh(Dayere)    z=(+)Charkhesh Jolo
            break;
        case 7:
            bone = 18905; //"SKEL_Spine3";
            offset = new mp.Vector3(-0.05, 0.0, 0.04); // x =(+)Paeen Badan    y=(-) Posht    z= (+) Rast Badan
            rotation = new mp.Vector3(90.0, -160.0, 90.0); // x=(-)Charkhesh Be Chap    y=(+)Chap Charkhesh(Dayere)    z=(+)Charkhesh Jolo
            break;
        default:
            break;
    }
        mp.attachmentMngr.register(weap[0], weap[1], bone, offset, rotation);
}

mp.attachmentMngr.register("garbage_job", "prop_rub_binbag_01", 28422, new mp.Vector3(0, 0.05, -0.04), new mp.Vector3(0, 8, 0));
mp.attachmentMngr.register("fish_rod", "prop_fishing_rod_01", 60309, new mp.Vector3(-0.01, -0.01, 0.07), new mp.Vector3(0, 0, 0));
mp.attachmentMngr.register("Mine", "prop_tool_jackham", 60309, new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0));

mp.attachmentMngr.register("Drink_Cola", "prop_ecola_can", 60309, new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0));
mp.attachmentMngr.register("Drink_Sprunk", "prop_orang_can_01", 60309, new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0));
mp.attachmentMngr.register("Drink_coffee", "ng_proc_coffee_01a", 60309, new mp.Vector3(-0.04, 0, -0.02), new mp.Vector3(0, 0, 0));
mp.attachmentMngr.register("Drink_Water", "prop_ld_flow_bottle", 60309, new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0));
mp.attachmentMngr.register("Drink_wine_red", "prop_wine_red", 60309, new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0));
mp.attachmentMngr.register("Throwmoney", "prop_cash_pile_01", 60309, new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0));
mp.attachmentMngr.register("Drink_Beer", "prop_beer_blr", 60309, new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0));
mp.attachmentMngr.register("Drink_Whiskey", "prop_whiskey_bottle", 60309, new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0));
mp.attachmentMngr.register("Drink_Votka", "p_whiskey_notop", 60309, new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0));
mp.attachmentMngr.register("Drink_konjak", "prop_drink_whisky", 60309, new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0));
mp.attachmentMngr.register("Drink_samp", "prop_drink_champ", 60309, new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0));

mp.attachmentMngr.register("Eat_Burger", "prop_cs_burger_01", 60309, new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0));
mp.attachmentMngr.register("Eat_sandwich", "prop_sandwich_01", 60309, new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0));
mp.attachmentMngr.register("Eat_hotdog", "prop_cs_hotdog_01", 60309, new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0));

mp.attachmentMngr.register("watering_can", "prop_wateringcan", 28422, new mp.Vector3(0, +0.1, +0.1), new mp.Vector3(-80, 0, -180));

mp.attachmentMngr.register("cuff", "p_cs_cuffs_02_s", 6286, new mp.Vector3(-0.05, 0.08, 0), new mp.Vector3(-90, 0, -90));
mp.attachmentMngr.register("wheatbox", "prop_feed_sack_01", 28422, new mp.Vector3(0.0, -0.15, -0.18), new mp.Vector3(0, 0, 0));
mp.attachmentMngr.register("teg", "prop_barbell_20kg", 28422, new mp.Vector3(0.0, 0.0, 0.0), new mp.Vector3(0, 0, 0));


mp.game.audio.startAudioScene("FBI_HEIST_H5_MUTE_AMBIENCE_SCENE");

mp.game.invoke(0xB4F90FAF7670B16F, false); //police reports
mp.game.invoke(0x218DD44AAAC964FF, "AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_GENERAL", true, 0);
mp.game.invoke(0x218DD44AAAC964FF, "AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_WARNING", true, 0);
mp.game.invoke(0x218DD44AAAC964FF, "AZ_COUNTRYSIDE_PRISON_01_ANNOUNCER_ALARM", true, 0);
mp.game.invoke(0xBDA07E5950085E46, 0, false, false);
mp.game.invoke(0x1D6650420CEC9D3B, "AZ_DISTANT_SASQUATCH", 0, 0);

mp.game.audio.setAudioFlag("LoadMPData", true);
mp.game.audio.setAudioFlag("DisableFlightMusic", true);

let CarryItem = false;
const controlsToDisable = [12, 13, 14, 15, 16, 17, 22, 23, 24, 25, 37, 44, 45, 47, 55, 58, 69, 70, 92, 114, 140, 141, 142, 143, 257, 263, 264, 331];

let adminrank = ['Support', 'Senior Support', 'Moderator', 'Senior Moderator', 'Administrator', 'Senior Administrator', 'Head Administrator', 'Developer', 'Founder'];


global.chatopened = false;
global.isChat = false;
global.logged = 0;

mp.game.interior.enableInteriorProp(mp.game.interior.getInteriorAtCoordsWithType(-38.62, -1099.01, 27.31, 'v_carshowroom'), 'csr_beforeMission');

mp.game.interior.enableInteriorProp(mp.game.interior.getInteriorAtCoordsWithType(-38.62, -1099.01, 27.31, 'v_carshowroom'), 'csr_beforeMission');
//mp.game.interior.enableInteriorProp(mp.game.interior.getInteriorAtCoordsWithType(-38.62, -1099.01, 27.31, 'v_carshowroom'), 'shutter_closed');

mp.game.controls.useDefaultVehicleEntering = false;

const controls = mp.game.controls;
    
controls.disableControlAction(0, 58, true);
controls.disableControlAction(0, 23, true);


mp.game.vehicle.defaultEngineBehaviour = false;

atm_close = true;


let ringTone = null,
    ringToneCounter = 0;



//
// CHAT UI
//


const localPlayer = mp.players.local;
var signal1, signal2;

var screenRes = mp.game.graphics.getScreenActiveResolution(0, 0);

mp.gui.chat.show(false); //Disables default RageMP Chat

mp.gui.chat.safeMode = false;

let chat = mp.browsers.new('package://files/sohbet-sistem/index.html');

chat.markAsChat();


var resolution = mp.game.graphics.getScreenResolution(0, 0);


global.lastCheck = 0;



var res_X = 1920; //API.getScreenResolutionMaintainRatio().Width;
var res_Y = 1080; //API.getScreenResolutionMaintainRatio().Height;

/* Speed Limiter */
var limitMenu = null;
var limitSpeedItem = null;
var limitToggleItem = null;

var limitMultiplier = 5;

var vehicleMaxSpeed = {};
var vehicleMaxSpeedEnabled = {};

var blockedModels = [782665360, -1860900134]; // people can't speed limit these vehicles (rhino and insurgent for example)
var blockedCategories = [14, 15, 16]; // people can't speed limit vehicles that belong these categories - https://wiki.gt-mp.net/index.php?title=Vehicle_Classes
//

let jail_time = 0;

/* NativeUI */
const NativeUI = require("files/nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const UIMenuListItem = NativeUI.UIMenuListItem;
const UIMenuCheckboxItem = NativeUI.UIMenuCheckboxItem;
const BadgeStyle = NativeUI.BadgeStyle;
const Point = NativeUI.Point;
const ItemsCollection = NativeUI.ItemsCollection;
const Color = NativeUI.Color;

var cam;
let TarayiciAcikmi = false;
const camerasManager = require('./files/camerasManager.js');

var menu_libary = false;
//Menus

var markers = {};
var blips = {};
var Textlabel = {};

class JobHelper {
    static createMarker(name, position, radius) {
        try {

        
        if (markers[name] != null) {
            return;
        }
        var marker = mp.markers.new(28, position, radius, {
            direction: new mp.Vector3(0, 0, 0),
            rotation: new mp.Vector3(0, 0, 0),
            color: [255, 0, 0, 100],
            visible: true,
            dimension: 0
        });
        markers[name] = marker;
            return marker;
        } catch (e) {
            mp.events.callRemote("Client_Error", "CreateMarker: " + e);
        }
    }
    static removeMarker(name) {
        try {

        
        if (markers.length == 0 || markers[name] == null) {
            return;
        }
        markers[name].destroy(); // Needs testing, should replace deleteEntity
        markers[name] = null;
        } catch (e) {
            mp.events.callRemote("Client_Error", "RemoveMarker Job: " + e);
        }
    }

    static createlabel(name, text, position, drawDistance, color) {
        if (Textlabel[name] != null) {
            return;
        }
        var marker = mp.labels.new(text, position,
        {
                los: false,
                font: 6,
                drawDistance: drawDistance,
                color: color,
                dimension: localPlayer.dimension
        });
        Textlabel[name] = marker;
        return marker;
    }
    static Editlabel(name,text) {
        if (Textlabel.length == 0 || Textlabel[name] == null) {
            return;
        }
        Textlabel[name].text = text; // Needs testing, should replace deleteEntity
    }
    static removelabel(name) {
        if (Textlabel.length == 0 || Textlabel[name] == null) {
            return;
        }
        Textlabel[name].destroy(); // Needs testing, should replace deleteEntity
        Textlabel[name] = null;
    }

    static createBlip(name, position, color) {
        try {

     
        if (blips[name] != null) {
            return blips[name];
        }
        let blip = mp.blips.new(1, position, {
            name: name,
            color: color,
            shortRange: false,
        });
        blips[name] = blip;
        return blip;
           } catch (e) {
            mp.events.callRemote("Client_Error", "CreateBlip Job: " + e);
        }
    }
    static removeBlip(name) {
        try {

       
        if (blips.length == 0 || blips[name] === null || blips[name] === undefined) {
            return;
        }
        blips[name].destroy();
            blips[name] = null;
        } catch (e) {
            mp.events.callRemote("Client_Error", "RemoveBlip Job: " + e);
        }
    }
}


class MarkerHelper {
    static createMarker(name, position, radius) {
        try {

        
        if (markers[name] != null) {
            return;
        }
        var marker = mp.markers.new(1, position, radius, {
            direction: new mp.Vector3(0, 0, 0),
            rotation: new mp.Vector3(0, 0, 0),
            color: [255, 0, 0, 100],
            visible: true,
            dimension: 0
        });
        markers[name] = marker;
        return marker;
        } catch (e) {
            mp.events.callRemote("Client_Error", "CreateMarker#2: " + e);
        }
    }
    static removeMarker(name) {
        try {

        
        if (markers.length == 0 || markers[name] == null) {
            return;
        }
        markers[name].destroy(); // Needs testing, should replace deleteEntity
        markers[name] = null;
        } catch (e) {
            mp.events.callRemote("Client_Error", "RemoveMarker#2: " + e);
        }
    }
}

class BlipHelper {
    static createBlip(name, position, color) {
        try {

        
        if (blips.length != 0 && blips[name] !== undefined && blips[name] !== null) {
            blips[name].destroy();
            blips[name] = null;
        }
        
        var blip = mp.blips.new(1, position, {
            name: name,
            color: color,

            shortRange: false,
        });
        blips[name] = blip;
            return blip;
        } catch (e) {
            mp.events.callRemote("Client_Error", "CreateBlip#2: " + e);
        }
    }
    static createBlipExt(name, position, color, size, sprite = 0, shortRange = false, bname = null) {
        try {

        
        if (blips.length != 0 && blips[name] !== undefined && blips[name] !== null) {
            blips[name].destroy();
            blips[name] = null;
        }
        var blip;

        if (bname == null) {
            blip = mp.blips.new(1, position, {
                //name: name,
                color: color,
                scale: size,
                shortRange: false,
            });
        } else {
            blip = mp.blips.new(1, position, {
                name: bname,
                color: color,
                scale: size,
                shortRange: false,
            });
        }

        blips[name] = blip;
        blips[name].setColour(color);
        blips[name].setAsShortRange(shortRange);
        blips[name].setScale(size);


        if (sprite != 0) blips[name].setSprite(sprite);
            return blip;
        } catch (e) {
            mp.events.callRemote("Client_Error", "CreateBlipEx: " + e);
        }
    }

    static removeBlip(name) {
        try {

        
        if (blips.length != 0 && blips[name] !== undefined && blips[name] !== null) {
            blips[name].destroy();
            blips[name] = null;
            }
        } catch (e) {
            mp.events.callRemote("Client_Error", "RemoveBlip#3: " + e);
        }

    }

    static moveBlip(name, position) {
        try {

        
        if (blips[name] == null) {
            return;
        }
        blips[name].setCoords(position);
        } catch (e) {
            mp.events.callRemote("Client_Error", "MoveBlip: " + e);
        }
    }

    static colorBlip(name, color) {
        try {

        
        if (blips[name] == null) {
            return;
        }
        blips[name].setColour(color);
        } catch (e) {
            mp.events.callRemote("Client_Error", "ColorBlip: " + e);
        }
    }

    static SetRoute(name, enabled) {
        try {

        
        if (blips[name] == null) {
            return;
        }
        blips[name].setRoute(enabled);
        } catch (e) {
            mp.events.callRemote("Client_Error", "SetRoute: " + e);
        }
    }
}

mp.events.add("GetNearestObject", () => {
    getNearestObjects()
});

function getFormattedDateTime() {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year}, ${hours}:${minutes}`;
}

function getNearestObjects() {

    var tempO = null;
    var objects = mp.objects.toArray();
    objects.forEach(
        (object) => {
            var posL = localPlayer.position;
            var posO = object.position;
            var distance = mp.game.gameplay.getDistanceBetweenCoords(posL.x, posL.y, posL.z, posO.x, posO.y, posO.z, true);
            if (object.getVariable('TYPE') != undefined && localPlayer.dimension === object.dimension && distance < 3) {
                if (tempO === null) tempO = object;
                else if (mp.game.gameplay.getDistanceBetweenCoords(posL.x, posL.y, posL.z, posO.x, posO.y, posO.z, true) <
                    mp.game.gameplay.getDistanceBetweenCoords(posL.x, posL.y, posL.z, tempO.position.x, tempO.position.y, tempO.position.z, true))
                    tempO = object;
            }
        });
    mp.gui.chat.push("object: " + tempO);
}

global.uiPlayer_Browsers = undefined;
let Bildirim = undefined;
global.uiGeneralStart_Browsers = undefined;
let uiGlobal_Browsers = undefined;
let Tuning_Browsers = undefined;
let autoshopbrowser = undefined;
let LockPick_Browser = undefined;
let uiProgressBar_Browsers = undefined;
let uiGlobal_Notifiaction = undefined;
let uiVelo_Browsers = undefined;
let paraporno = undefined;

let uiDeathScreen = undefined;



let currentMoney = null;
let currentBank = null;

let payday = null;
let aktifoyuncu = null;

let currentHunger = 0;
let currentThirsty = 0;

function updateDirectionText() {
    var camera = mp.cameras.new("gameplay");
    var cameraDirection = camera.getDirection();

    if (0.3 < cameraDirection.x && 0.3 < cameraDirection.y) {
        text = "N";
    } else if (cameraDirection.x < -0.3 && 0.3 < cameraDirection.y) {
        text = "N";
    } else if (0.3 < cameraDirection.x && cameraDirection.y < -0.3) {
        text = "S";
    } else if (cameraDirection.x < -0.3 && cameraDirection.y < -0.3) {
        text = "S";
    } else if (-0.3 < cameraDirection.x && cameraDirection.x < 0.3 && cameraDirection.y < -0.3) {
        text = "S";
    } else if (cameraDirection.x < -0.3 && -0.3 < cameraDirection.y && cameraDirection.y < 0.3) {
        text = "W";
    } else if (0.3 < cameraDirection.x && -0.3 < cameraDirection.y && cameraDirection.y < 0.3) {
        text = "E";
    } else if (-0.3 < cameraDirection.x && cameraDirection.x < 0.3 && cameraDirection.y > 0.3) {
        text = "N";
    }
    camera.destroy(true);
}

function playerEnterVehicleHandler(vehicle, seat) {
    mp.players.local.setHelmet(false);
}

mp.events.add("playerEnterVehicle", playerEnterVehicleHandler);




var newCam = null;


var loginCamera = camerasManager.createCamera('loginCamera', 'default', new mp.Vector3(-436.0717, 1039.26, 372.1287), new mp.Vector3(3.063985, 0.0, -170.8151), 60);

var school_checkpoint = null;



let clicked = false;

let biz = undefined;
mp.events.add({
    "menu_libary": (toggles) => {
        menu_libary = toggles;
        
        if(toggles === false) mp.events.callRemote('animationMenuVariableOff');
    },

    "factionCharacterKick": (id,rank) => {
        mp.events.callRemote("factionCharacterKick", id,rank);
    },
    "factionJoin": (id) => {
        mp.events.callRemote("factionJoin", id);
    },
    "factionJoinDecline": (id) => {
        mp.events.callRemote("factionJoinDecline", id);
    },
    "factionJoinApprove": (id) => {
        mp.events.callRemote("factionJoinApprove", id);
    },
    "factionDecline": () => {
        mp.events.callRemote("factionDecline");
    },
    "factionLeave": (id) => {
        mp.events.callRemote("factionLeave", id);
    },
    "ShowFactionList": (inventoryJson, leader, member, invite) => {
        if (uiGlobal_Browsers == undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/birlik-sistem/FactionsList.html");
            uiGlobal_Browsers.execute("populateFactionsList('" + inventoryJson + "','" + leader + "','" + member + "','" + invite + "')");
        }

    },
    "showfactionmenu": (factionInfo, requestsList, membersList, ranksList) => {
        if (uiGlobal_Browsers == undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/birlik-sistem/FactionsMenu.html");
            uiGlobal_Browsers.execute("populateFactionMenu('" + factionInfo + "','" + requestsList + "','" + membersList + "','" + ranksList + "')");
        }
    },
    "closeFactions": () => {
        uiGlobal_Browsers.destroy();
        uiGlobal_Browsers = undefined;
    },
    "createFaction": (name, type) => {

        mp.events.callRemote("createFaction", name);
        uiGlobal_Browsers.destroy();
        uiGlobal_Browsers = undefined;
    },
    "EditCharacterRank": (characterid, newrank) => {

        mp.events.callRemote("EditCharacterRank", characterid, newrank);
    },
    "EditRankName": (rankid, rankname) => {

        mp.events.callRemote("EditRankName", rankid, rankname);
    },



    "addLocal": (attachmentId) => {
       mp.attachmentMngr.addLocal(attachmentId);
    },
    "removeLocal": (attachmentId) => {
       mp.attachmentMngr.removeLocal(attachmentId);
    },
    
    "Send_ToChat": (time, name, text) => {

        if (name == undefined)
        {
            name = '';
        }
        if (text == undefined) {
            text = '';
        }

        let args = [name + "<span style='opacity:0; margin-left:-2px;'>a</span>", text];
        
        mp.gui.chat.push(name + "<span style='opacity:0; margin-left:-2px;'>a</span>" + text);
 

    },

    "openChat": () => {
        if (global.chatopened) return false;
        toggleChat(true);
        global.chatopened = true;
    },
    "closeChat": () => {
        if (!global.chatopened) return false;
        chat.execute("sendMsg();");

        toggleChat(false);
        global.chatopened = false;
    },
    "forceCloseChat": () => {
        if (!global.chatopened) return false;
        toggleChat(false);
        global.chatopened = false;
    },
    "getPreviousMessage": () => {
        if (!global.chatopened) return false;

        chat.execute("previous();");
    },
    "getNextMessage": () => {
        if (!global.chatopened) return false;

        chat.execute("next();");
    },
    "CreateRaceCheckpoint": (position, direction) => {

        school_checkpoint = mp.checkpoints.new(0, position, 6.0, {
            direction: direction,
            color: [247, 221, 52, 150],
            visible: true,
            dimension: 0
        });

        BlipHelper.createBlipExt("race_checkpoint", position, 81, 1.0, 0, false);
        BlipHelper.createBlipExt("race_checkpoint_2", direction, 81, 0.5, 0, false);
        BlipHelper.colorBlip("race_checkpoint", 81);
        BlipHelper.colorBlip("race_checkpoint_2", 81);

    },
    
    "DeleteRaceCheckpoint": () => {
        if (school_checkpoint != null) {
            school_checkpoint.destroy();
            school_checkpoint = null;
        }

        BlipHelper.removeBlip("race_checkpoint");
        BlipHelper.removeBlip("race_checkpoint_2");
    },

    "KEY_ARROW_UP": () => {
        if (logged === 0 || chatopened || TarayiciAcikmi == true || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;

        mp.events.callRemote('keypress:ARROW_UP');
    },
    "NewMenuSelected": (id,name) => {
        mp.events.callRemote("NewMenuSelected",id,name);
    },
    "KEY_ARROW_UP": () => {
        if (logged === 0 || chatopened || TarayiciAcikmi == true || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;

        mp.events.callRemote('keypress:ARROW_UP');
    },

    "blip_create": (name, position, color) => {
        BlipHelper.createBlip(name, position, color);
    },

    "blip_create_ext": (name, position, color, size, sprite = 0, range = false, bname = null) => {
        BlipHelper.createBlipExt(name, position, color, size, sprite, range, bname);
        BlipHelper.colorBlip(name, color);
    },

    "blip_remove": (name) => {
        BlipHelper.removeBlip(name);
    },
    
    "blip_move": (name, position) => {
        BlipHelper.moveBlip(name, position);
    },

    "blip_color": (name, color) => {
        BlipHelper.colorBlip(name, color);
    },

    "blip_router_visible": (name, enabled) => {
        BlipHelper.SetRoute(name, enabled);
    },

    "gps_set_loc": (nearestX, nearestY) => {
        mp.game.ui.setNewWaypoint(nearestX, nearestY);
    },
   
    "getgroundz": () => {
        mp.gui.chat.push("Ground Z: ~r~" + mp.game.gameplay.getGroundZFor3dCoord(localPlayer.position.x, localPlayer.position.y, localPlayer.position.z, 0.0, false));
    },
   
    "onSubmitGeneric": (string) => {
        onSubmitGeneric(string);
    },

    "reset_camera": () => {
        mp.game.cam.renderScriptCams(false, false, 0, true, false);
        if (newCam != null) newCam.setActive(false);
    },

    "play_sound": (soundName, soundSetName) => {
        if (soundName === null || soundSetName === null) return;
        mp.game.audio.playSoundFrontend(-1, soundName, soundSetName, true);
    },

    "DestroyCamera": () => {
        mp.game.cam.renderScriptCams(false, false, 0, true, false);
        newCam.setActive(false);
    },

    "JailTime": (time) => {
        jail_time = time;
    },
    //
    "logged": () => {
        logged = 1;
        mp.players.local.setHelmet(false);

        mp.game.cam.renderScriptCams(false, false, 0, true, false);

    },
    
    "showChat": () => {
        mp.gui.chat.activate(true);
        mp.gui.chat.show(true);
    },
   
    
    "TimeOfDay": (time_text) => {
        DAYNIGHT_TEXT = time_text;
        
        if (uiVelo_Browsers != undefined) {
            
            street = mp.game.pathfind.getStreetNameAtCoord(player.position.x, player.position.y, player.position.z, 0, 0);

            const local = mp.players.local;
            let getStreet = mp.game.pathfind.getStreetNameAtCoord(local.position.x, local.position.y, local.position.z, 0, 0);

            let streetName = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);

            zone = mp.game.gxt.get(mp.game.zone.getNameOfZone(player.position.x, player.position.y, player.position.z));
            uiVelo_Browsers.execute(`updateLocation("${zone}", "${streetName}");`);
        }
    },

    "UpdateWeaponInfo": () => {
        if (uiVelo_Browsers != undefined) {
            uiVelo_Browsers.execute(`updateDate("${getFormattedDateTime()}");`);

            const weaponData = getWeaponInfo();
            if (weaponData) {
                uiVelo_Browsers.execute(`toggleAmmo(true);`);
                uiVelo_Browsers.execute(`updateAmmo("${weaponData.totalAmmo}", "${weaponData.clipAmmo}");`);
            }
            else
            {
                uiVelo_Browsers.execute(`toggleAmmo(false);`);
            }
        }
    },

    "GuvenliBolge": (status) => {
        if (uiVelo_Browsers != undefined) {
            if (status) {
                uiVelo_Browsers.execute(`toggleGuvenli(true);`);
            }
            else
            {
                uiVelo_Browsers.execute(`toggleGuvenli(false);`);
            }
        }
    },

    "CarryItem": (bol) => {
        CarryItem = bol;
    },
    "UpdateMoneyBankName": (money, bank, name, id) => {
        currentMoney = money;
        currentBank = bank;
        if (uiVelo_Browsers != undefined) {
            uiVelo_Browsers.execute(`updateCash(${currentMoney});`);
            uiVelo_Browsers.execute(`updateBank(${currentBank});`);
            //uiVelo_Browsers.execute(`updatePlayerName("${name}", ${id}});`);
            let name = player.name.replace('_', ' ');
            uiVelo_Browsers.execute(`updatePlayerName("${name}");`);

        }
    },

    "update_hunger_display": (hunger, thirsty) => {
        currentHunger = hunger;
        currentThirsty = thirsty;

        if (uiPlayer_Browsers != undefined) {
            uiPlayer_Browsers.execute("SetPlayerFood(" + currentHunger + ", " + currentThirsty + ")");
           
        }
    },

    "update_health": (health,armor) => {
        if (uiVelo_Browsers != undefined) {
            uiVelo_Browsers.execute("updateHealth(" + health + ")");
            uiVelo_Browsers.execute("updateArmor(" + armor + ")");
            uiVelo_Browsers.execute("updatePayday('31')");
        }
    },


    "toggle_player_hud": (stats) => {
        if (uiPlayer_Browsers != undefined) {
            uiPlayer_Browsers.execute("DisplayMenu(" + stats + ")");
            uiVelo_Browsers.execute("DisplayMenu(" + stats + ")");
        }
    },
    
    "show_player_hud": (ui_enable) => {

        if (ui_enable === true) {
            if (uiPlayer_Browsers === undefined) {
                uiPlayer_Browsers = mp.browsers.new("package://files/hud-sistem/testdeks.html");
            }

            if (Bildirim === undefined) {
                Bildirim = mp.browsers.new("package://files/bildirim-sistem/index.html");
            }
            
            if (uiVelo_Browsers === undefined) {
                uiVelo_Browsers = mp.browsers.new("package://files/hud-sistem/testdeks.html");
                uiVelo_Browsers.execute("toggleAmmo(false)");
                uiVelo_Browsers.execute("toggleMoney(true)");
                uiVelo_Browsers.execute("togglePlayer(true)");
                uiVelo_Browsers.execute("toggleLocation(true)");
                uiVelo_Browsers.execute("toggleVehicle(false)");
            }
            // uiVelo_Browsers.execute("SetPlayerMoney(" + currentMoney + ", " + currentBank + ")");

            
        } else {
            if (uiPlayer_Browsers != undefined) {
                uiPlayer_Browsers.Destroy();
                uiPlayer_Browsers = undefined;
            }
            if (uiVelo_Browsers != undefined) {
                uiVelo_Browsers.Destroy();
                uiVelo_Browsers = undefined;
            }
        }
    },

    "displaySubtitle": (message_text, time) => {

        mp.game.ui.setTextEntry2("STRING");
        mp.game.ui.addTextComponentItemString(message_text);
        mp.game.ui.drawSubtitleTimed(time, 1);
    },

    "DisplayCustomCamera": (position, target, fov = 60) => {
        newCam = mp.cameras.new('default', position, target, fov);
        newCam.setCoord(position.x, position.y, position.z);
        newCam.pointAtCoord(position.x, position.y, position.z);
        newCam.setFov(fov);

        newCam.setActive(true);
        mp.game.cam.renderScriptCams(true, false, 0, true, false);
    },

    "DestroyCustomCamera": () => {
        mp.game.cam.renderScriptCams(false, false, 0, true, false);
        newCam.setActive(false);
    },

    "playAnimation": (dict, state, flag) => {
        mp.events.callRemote('PlayAnimationFromMenu', dict, state, flag);
    },

    "stopAnimation": () => {
        mp.events.callRemote('StopAnimationFromMenu');
    },

    "closeAnimationMenu": () => {
        mp.events.call('Destroy_Character_Menu');
        mp.events.callRemote('closeAnimationMenu');
    },
    "setAnimationShortcut": (e, category, t) => {
        mp.gui.chat.push('setAnimationShortcut(' + e + ', ' + category + ', ' + t + ')');
    },

    "InjuredSystem": (time) => {
        mp.game.graphics.startScreenEffect("DeathFailMPIn", 0, true);
        mp.game.cam.setCamEffect(1);

    },
    
    "InjuredSystem:Destroy": () => {

        mp.game.graphics.stopScreenEffect("DeathFailMPIn");
        mp.game.cam.setCamEffect(0);
    },

    
    "Display_Release_Vehicles": (vehicle_list) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/arac-sistem/vehicle_release.html");
        }

        uiGlobal_Browsers.execute("LoadPlayerVehiclesToRelease('" + vehicle_list + "');");
        mp.gui.cursor.visible = true;
    },

    "Player_Vehicle_Release": (index, price) => {
        mp.events.callRemote("PayInsure", index, price);
    },
    
    "LoadWhiteList": (data) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/whitelist/whitelist_manage.html");
        }

        uiGlobal_Browsers.execute("LoadWhiteList('" + data + "');");
        mp.gui.cursor.visible = true;
    },

    "Display_Player_Vehicles": (vehicle_list) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/arac-sistem/vehicle_list.html");
        }

        uiGlobal_Browsers.execute("LoadPlayerVehicles('" + vehicle_list + "');");
        mp.gui.cursor.visible = true;
    },

    "Display_Wanted_List": (wanted_list) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/arac-sistem/wanted.html");
        }

        uiGlobal_Browsers.execute("LoadWantedList('" + wanted_list + "');");
        mp.gui.cursor.visible = true;
    },

    "Player_Whitelist_Aprove": (index) => {
        mp.events.callRemote("Player_Whitelist_Aprove", index);
    },

    "Player_Whitelist_Remove": (index) => {
        mp.events.callRemote("Player_Whitelist_Remove", index);
    },
    
    "Player_Vehicle_Track": (index) => {
        mp.events.callRemote("TrackVehicle", index);
    },

    "trackplayer": (index) => {
        mp.events.callRemote("locateplayer", index);
    },

    "UpdateVehicleInfo": (vehname) => {
        if (uiGlobal_Browsers != undefined) {

            let hash = undefined;
             hash = mp.game.joaat(vehname);
            if (hash == undefined) {
                uiGlobal_Browsers.execute("updateVehicleInfo('0','0','0','0','0');");

            } else {
                uiGlobal_Browsers.execute("updateVehicleInfo('" + mp.game.vehicle.getVehicleModelMaxBraking(hash) + "','" + mp.game.vehicle.getVehicleModelAcceleration(hash) + "','" + (mp.game.vehicle.getVehicleModelMaxSpeed(hash) * 3.6) + "','" + mp.game.vehicle.getVehicleModelMaxNumberOfPassengers(hash) + "','" + mp.game.vehicle.getVehicleModelMaxTraction(hash) + "');");
            }
        }

    },
    
    "Exit_Tuning": () => {
        Tuning_Browsers.destroy();
        Tuning_Browsers = undefined;
        mp.gui.cursor.visible = false;
        mp.events.callRemote("Hide_LSCustom")

    },
    "tunerexit": () => {
        if (Tuning_Browsers !== undefined) {
            Tuning_Browsers.destroy();
            Tuning_Browsers = undefined;
        }
    },
    "Display_Tunning_home": () => {
        mp.events.call("tunerexit");
        if (Tuning_Browsers === undefined) {
            Tuning_Browsers = mp.browsers.new("package://files/mekanik-sistem-ui/lscustoms/home.html");
            mp.events.callRemote("ResetVehicleMod");
            mp.gui.cursor.visible = true;
        }
    },
    "Display_Tunning_pages": (name) => {
        mp.events.call("tunerexit");
        if (Tuning_Browsers === undefined) {
            mp.gui.chat.push(name);
            Tuning_Browsers = mp.browsers.new("package://files/mekanik-sistem-ui/lscustoms/"+name+".html");
            mp.gui.cursor.visible = true;
        }
    },
    "tunning_onindexchange": (permanent,name,id) => {
        if (permanent) {
            mp.events.callRemote("tunning_select", name, id);
        } else {
            mp.events.callRemote("tunning_preview",name,id);

        }
    },
    "tunning_MainMenuRespone": (name) => {
        mp.events.callRemote("MainMenuRespone", name);
    },
    "Display_Tunning_with_data": (data, name) => {
        mp.events.call("tunerexit");
        if (Tuning_Browsers === undefined) {
        //    mp.console.logInfo(JSON.parse(data)[1].modValue + " " + JSON.parse(data)[1].price + " " + JSON.parse(data)[1].Label, false, false);

            Tuning_Browsers = mp.browsers.new("package://files/mekanik-sistem-ui/lscustoms/" + name + ".html");
            Tuning_Browsers.execute("loaddata('" + data + "');");
            mp.gui.cursor.visible = true;

        }
    },	

    "Destroy_dealership_Menu": (vehname) => {
        if (uiGlobal_Browsers != undefined) {
            mp.events.callRemote("DealershipExitMenu");
            uiGlobal_Browsers.destroy();
            uiGlobal_Browsers = undefined;
            mp.gui.cursor.visible = false;
            freezeMe = false;
            localPlayer.setInvincible(false);
            mp.events.call("toggle_player_hud", true);

        }
    },

    "PreviewVehicleDealership": (vehicle) => {
        mp.events.callRemote("PreviewVehicleDealership", vehicle);
    },
    
    "Business_Buy_Vehicle": (vehicle) => {
        mp.events.callRemote("BuyVehicle_FromDealership", vehicle);
    },

    "Display_Whitelist_Screen": () => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/giris-sistem/whitelist.html");
        }

    },
    
    "Display_FilesMissing_Screen": () => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/giris-sistem/files_missing.html");
        }

    },

    "LoadShopMenu": (JsonList, bussiness_name, return_name, profit_percent) => {
        if (uiGlobal_Browsers == undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/market-yonetim-sistem/ItemShopCatalog.html");
            uiGlobal_Browsers.execute("populateBusinessItems('" + JsonList + "',' " + bussiness_name + "','" + return_name + "','" + profit_percent + "')");
            mp.gui.cursor.visible = true;
            mp.events.call("toggle_player_hud", false);
        }
        

    },
    "Closeshopmenu": () => {
        if (uiGlobal_Browsers != undefined) {
            uiGlobal_Browsers.destroy();
            uiGlobal_Browsers = undefined;
            mp.gui.cursor.visible = false;
            mp.events.call("toggle_player_hud", true);
        }
    },

    "purchaseItem": (returnto, selectedname, selected, purchasedAmount) => {

        mp.gui.chat.push(returnto+" "+ selectedname+" "+ selected+" "+ purchasedAmount);
        switch (returnto) {

            case "business":
                {
                    mp.events.callRemote("BusinessShop",selected,selectedname, purchasedAmount);
                    break;
                }
            default:
                break;
        }
    },

    "Display_DealerShip_Manage": (name, type, safe, vehicles_stock, vehicles_list) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/arac-sistem/dealership.html");
        }

        uiGlobal_Browsers.execute("LoadBusinessManageMenu('" + name + "', '" + type + "', " + safe + ", '" + vehicles_stock + "', '" + vehicles_list + "');");
        mp.gui.cursor.visible = true;
    },

    "Business_Change_Name": (new_name) => {
        mp.events.callRemote("Business_Change_Name", new_name);
    },

    "Business_Depositar_Fundos": (value) => {
        mp.events.callRemote("Business_Depositar_Fundos", value);
    },

    "Business_Retirar_Fundos": (value) => {
        mp.events.callRemote("Business_Retirar_Fundos", value);
    },

    "Business_Buy_Vehicle_Stock": (name, stock, price) => {
        mp.events.callRemote("vehicle_to_business", name, stock, price);
    },

    "Business_Save_Vehicle": (name, price, visibility) => {
        mp.events.callRemote("vehicle_save_business", name, price, visibility);
    },
    "Lockpick": () => {
        if (LockPick_Browser === undefined) {
            LockPick_Browser = mp.browsers.new("package://files/karakter-sistem/lockpick.html");
            mp.gui.cursor.visible = true;

        }
    },
    "LockPickResult": (result) => {
        
        if (LockPick_Browser != undefined) {
            LockPick_Browser.destroy();uiGlobal_Browsers
            LockPick_Browser = undefined;
        }
        mp.events.callRemote("LockPickResult",result)
        mp.gui.cursor.visible = false;
        
    },

    "Display_carshop": () => {
        if (autoshopbrowser === undefined) {
            autoshopbrowser = mp.browsers.new("package://files/galeri-sistem/carshop.html");
        }

        mp.gui.cursor.visible = true;
    },
    
    "ClientOnRangeChangeBarber": (id, val) => {
        mp.events.callRemote("ClientOnRangeChangeBarber", id, val);
    },

    "Display_MDC": () => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/mdc-sistem/PolicePanel.html");
        }

        mp.gui.cursor.visible = true;
    },
   
   
    ////NEW MDC ////
    "PersonFineAdded": (data) => {
        uiGlobal_Browsers.execute("PersonFineAdded('" + data + "');");
    },
    "PersonCaseAdded": (data) => {
        uiGlobal_Browsers.execute("PersonCaseAdded('" + data + "');");
    },
    "PersonNoteAdded": (data) => {
        uiGlobal_Browsers.execute("PersonNoteAdded('" + data + "');");
    },

    "mdcPersonAddNote": (name, reason) => {
        mp.events.callRemote("mdcPersonAddNote", name, reason);
    },
    "mdcPersonNoteDelete": (ID) => {
        mp.events.callRemote("mdcPersonNoteDelete", ID);
    },
    "mdcPersonAddCase": (name, reason, jailtime) => {
        mp.events.callRemote("mdcPersonAddCase", name, reason, jailtime);
    },
    "mdcPersonAddFine": (name, reason, price) => {
        mp.events.callRemote("mdcPersonAddFine", name, reason, price);
    },
    "mdcFindPersons": (name) => {
        mp.events.callRemote("mdcFindPersons", name);
    },
    "mdcPersonDetails": (name) => {
        mp.events.callRemote("mdcPersonDetails", name);
    },
    "mdcFindVehicles": (name) => {
        mp.events.callRemote("mdcFindVehicles", name);
    },

    "mdc_response_vehicle": (data) => {

        uiGlobal_Browsers.execute("ShowVehicles('" + data + "');");
    },
    "mdc_response_player": (data) => {

        uiGlobal_Browsers.execute("ShowPersons('" + data + "');");
    },
    "sendPersonDetails": (data, vehicles,fines,warrant) => {

        uiGlobal_Browsers.execute("ShowPersonDetails('" + data + "','" + vehicles + "','" + fines + "','" + warrant +"');");
    },

    "mdc_warrant_list": (name) => {
        mp.events.callRemote("mdc_warrant_list", name);
    },


    "mdc_response_911list": (data) => {

        if (uiGlobal_Browsers === undefined) {
            return;
        }

        uiGlobal_Browsers.execute("Check911List('" + data + "');");
    },

    "SendReport": (reportList) => {
        if (uiGlobal_Browsers === undefined) {
          uiGlobal_Browsers = mp.browsers.new("package://files/rapor-sistem/index.html");
        }

        const reportListJson = JSON.stringify(reportList);
        uiGlobal_Browsers.execute(`SendingReport('${reportListJson}');`);
        mp.gui.cursor.visible = true;
      },


    "Display_Characters": (character_data) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/karakter-sistem/characters.html");
        }

        mp.events.callRemote("testdeksevent2", localPlayer.dimension);
        camerasManager.setActiveCamera(loginCamera, true);
        camerasManager.setActiveCameraWithInterp(loginCamera, new mp.Vector3(-508.6306, -267.414, 63.64975), new mp.Vector3(-14, 0, 32), 10000, 0, 0)
       // camerasManager.setActiveCameraWithInterp(selectCharacter, new mp.Vector3(407.14013671875, -353.97119140625, 51.77901077270508), new mp.Vector3(0, 0, 0), 0, 0, 0);
        uiGlobal_Browsers.execute("LoadCharacters('" + character_data + "');");
        mp.gui.cursor.visible = true;
    },

    
    "Destroy_Character_Menu": () => {
        if (uiGlobal_Browsers != undefined) {
            uiGlobal_Browsers.destroy();
            uiGlobal_Browsers = undefined;
        }
        mp.gui.cursor.visible = false;
        
        mp.game.graphics.transitionFromBlurred(1);

        mp.events.callRemote('Inventory_Close');
    },

    "SelectCharacter": (character_id) => {
        mp.events.callRemote('SelectCharacter', character_id);
    },

    "ClientPreviewCharacterID": (character_id) => {

        mp.events.callRemote('ClientPreviewCharacterID', character_id);
    },

    "CreateCharacter": () => {
        mp.events.callRemote('CreateCharacter');
    },

    "Show_Char_Creator": (character_data) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/giris-sistem/personagem.html");
        }

        uiGlobal_Browsers.execute("LoadNewCharacter('" + character_data + "');");
        mp.gui.cursor.visible = true;

        localPlayer.taskPlayAnim("amb@world_human_guard_patrol@male@base", "base", 8.0, 1, -1, 1, 0.0, false, false, false);
    },

    "Show_Char_Creator_2": (character_data) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/giris-sistem/personagem_2.html");
        }

        uiGlobal_Browsers.execute("LoadFaceFeatures('" + character_data + "');");
        mp.gui.cursor.visible = true;
    },

    "Show_Char_Creator_3": (character_data) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/giris-sistem/personagem_3.html");
        }

        uiGlobal_Browsers.execute("LoadClothing('" + character_data + "');");
        mp.gui.cursor.visible = true;
    },

    "ClientCharCreationBack": () => {
        mp.events.callRemote('ClientCharCreationBack');
    },

    "ClientCharCreationNext": (first_name, second_name,age) => {
        mp.events.callRemote('Display_Creator_part2', first_name, second_name,age);
    },

    "ClientCharCreation2Back": () => {
        mp.events.callRemote('Display_Creator_part1');
    },

    "ClientCharCreation2Next": () => {
        mp.events.callRemote('Display_Creator_part3');
    },

    "ClientCharCreation3Back": () => {
        mp.events.callRemote('ClientCharCreation3Back');
    },

    "ClientOnRangeChange": (id, val) => {
        mp.events.callRemote('ClientOnRangeChange', id, val);
    },
    "ClientSetFaceFeature": (id, val) => {
        mp.events.callRemote('ClientSetFaceFeature', id, val);
    },
    "ClientSetTraje": (id) => {
        mp.events.callRemote('ClientSetTraje', id);
    },
    "cameraPointTo": (id) => {
        mp.events.callRemote('cameraPointTo', id);
    },
    "ClientCharCreation3Next": () => {
        mp.events.callRemote('ClientCharCreation3Next');
    },

    "hidePoliceCivilMenu": () => {
        if (uiGlobal_Browsers != undefined) {
            uiGlobal_Browsers.destroy();
            uiGlobal_Browsers = undefined;
            mp.gui.cursor.visible = false;
        }
    },
    "ShowCivilPDMenu": (data) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/mdc-sistem/CivilMenu.html");
            uiGlobal_Browsers.execute("LoadFines('"+data+"');");
        }
        mp.gui.cursor.visible = true;
    },

    "trypayfine": (id,price) => {
        mp.events.callRemote('trypayfine',id,price);
    },
    "finepaided": (id) => {
        if (uiGlobal_Browsers != undefined) {
            uiGlobal_Browsers.execute("DeletePaidedFine(" + id + ");");
        }
    },

    "Display_gunsstore": () => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/silah-market-sistem/index.html");
            mp.gui.cursor.visible = true;
        }
        
    },

    "Display_Polvehicles": () => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/lspd-gunstore/lspdvehicle/index.html");
            mp.gui.cursor.visible = true;
        }
        
    },

    "Display_Emsvehicles": () => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/lsmd-sistem/index.html");
            mp.gui.cursor.visible = true;
        }
        
    },

    "Display_Mehvehicles": () => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/mekanik-sistem/mechveh/index.html");
            mp.gui.cursor.visible = true;
        }
        
    },

    "Hide_Crafting_System": () => {
        if (uiGlobal_Browsers != undefined) {
            uiGlobal_Browsers.destroy();
            uiGlobal_Browsers = undefined;
            mp.gui.cursor.visible = false;
        }
        
    },

    "HideCarShop": () => {
        if (autoshopbrowser != undefined) {
            autoshopbrowser.destroy();
            autoshopbrowser = undefined;
            mp.gui.cursor.visible = false;
        }
        
    },

    "kabuletti": (id) => {
        mp.events.callRemote("kabulettix", id);
        mp.gui.cursor.visible = false;
    },

    "evpanel": (id, evid) => {
        mp.events.callRemote("EvPanelCS", id, evid);
        mp.gui.cursor.visible = false;
    },

    "kabuletmedi": (id) => {
        mp.events.callRemote("kabuletmedix", id);
        mp.gui.cursor.visible = false;
    },

    "client::polvehs": (id) => {
        mp.events.callRemote("getlspdvehs", id);
    },

    "client::emsvehs": (id) => {
        mp.events.callRemote("getemsvehs", id);
    },

    "client::mehvehs": (id) => {
        mp.events.callRemote("getmehvehs", id);
    },

    "clientbveh": (selectedVehicle, color) => {
        mp.events.callRemote("VehBuy", selectedVehicle, color);
    },

    "clientvehpreview": (vehiclename, selectedColor) => {
        mp.events.callRemote("GetVehPreview", vehiclename, selectedColor);
    },

    "cexitvehshop": () => {
        mp.events.callRemote("VehPreviewExit");
    },

    "testvoznjaveh": (testveh) => {
        mp.events.callRemote("TestDriveRemote", testveh);
    },

    "ClientCarControl": (index) => {
        mp.events.callRemote("CarControl", index);
    },

    "client::buyweapon": (id) => {
        mp.events.callRemote("bweaponshop", id);
    },
    
    "Display_vehosiguranje": () => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/sigorta-sistem/index.html");
            mp.gui.cursor.visible = true;
        }
        
    },

    "Display_sevenstore": () => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/market-sistem/index.html");
            mp.gui.cursor.visible = true;
        }
        
    },

    "Display_lspdguns": () => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/lspd-gunstore/index.html");
            mp.gui.cursor.visible = true;
        }
        
    },

    "Display_cartool": () => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/arac-panel-sistem/index.html");
            mp.gui.cursor.visible = true;
        }
        
    },

    "Display_mechdel": () => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/mekanik-sistem/index.html");
            mp.gui.cursor.visible = true;
        }
        
    },

    "Display_newbank": () => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/banka-sistem/index.html");
            mp.gui.cursor.visible = true;
        }
        
    },

    "Display_newbbank": (totmoney) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/bar-sistem/business.html");
            mp.gui.cursor.visible = true;
        }
        uiGlobal_Browsers.execute(`document.getElementById('currentbussinesmoney').innerHTML="` + totmoney + `";`);
    },

    "Display_rent": () => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/arac-kiralama-sistem/index.html");
            mp.gui.cursor.visible = true;
        }
        
    },

    "Display_brent": () => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/tekne-kiralama-sistem/index.html");
            mp.gui.cursor.visible = true;
        }
        
    },

    "Display_bars": () => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/bar-sistem/index.html");
            mp.gui.cursor.visible = true;
        }
        
    },

    "client::sevenstore": (id) => {
        mp.events.callRemote("fourseven", id);
    },

    "client::lspdgunstore": (id) => {
        mp.events.callRemote("lspdguns", id);
    },

    "client::mechanicdelovi": (id) => {
        mp.events.callRemote("mechdel", id);
    },

    "InsuranceBuy": (id) => {
        mp.events.callRemote("InsuranceBuys", id);
    },

    "client::renter": (id) => {
        mp.events.callRemote("rentveh", id);
    },
    "client::brenter": (id) => {
        mp.events.callRemote("bRentveh", id);
    },
    "client::dreport": (id) => {
        mp.events.callRemote("dreport", id);
    },
    "client::lpanswer": (id, text) => {
        mp.events.callRemote("lpanswer", id, text);
    },
    "client::barstore": (id) => {
        mp.events.callRemote("barstores", id);
    },
    "Client:BankTransfareMoney": (banknumber, amount) => {
        mp.events.callRemote("BankTransfareMoney", banknumber, amount);
    },
    "Client:BankDepositMoney": (amount) => {
        mp.events.callRemote("BankDepositMoney", amount);
    },
    "Client:BankWithdrawMoney": (amount) => {
        mp.events.callRemote("BankWithdrawMoney", amount);
    },
    "Client:bBankWithdrawMoney": (amount) => {
        mp.events.callRemote("bBankWithdrawMoney", amount);
    },

    //
    // First
    //
    "ShowModal": (callback_id, title, text, bottom_confirm, bottom_cancel) => {

        if (uiPlayer_Browsers != undefined) {
            uiPlayer_Browsers.execute("ShowModal('" + callback_id + "', '" + title + "', '" + text + "', '" + bottom_confirm + "', '" + bottom_cancel + "')");
            mp.gui.cursor.visible = true;
        }
    },

    "modalConfirm": (response_callback) => {
        mp.events.callRemote('modalConfirm', response_callback);
        mp.gui.cursor.visible = false;
    },

    "modalCancel": (response_callback) => {
        mp.events.callRemote('modalCancel', response_callback);
        mp.gui.cursor.visible = false;
    },

    //

    "Display_Calls": (name, arrjson) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/dispatch-sistem/services.html");
        }

        uiGlobal_Browsers.execute("LoadCalls('" + name + "', '" + arrjson + "');");
        mp.gui.cursor.visible = true;
    },

    "Service_Track": (id) => {
        mp.events.callRemote("Service_Track_Server", id);
    },

    "Service_Remove": (id) => {
        mp.events.callRemote("Service_Remove_Server", id);
    },

    //
    "rappel": (target) => {

        target.clearTasks();
        target.taskRappelFromHeli(10.0);
    },

   
    "Display_HQ_Storage": (inv, storage, limit, vehicle_limit) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/envanter-sistem/HQ-Inventory.html");
        }

        uiGlobal_Browsers.execute("LoadInventory('" + inv + "', '" + storage + "', " + limit + ", " + vehicle_limit + ");");
        mp.gui.cursor.visible = true;
    },

    "Display_Player_Storage": (inv, storage, limit, vehicle_limit) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/envanter-sistem/Side-Inventory.html");
            mp.game.graphics.transitionToBlurred(1);

        }


        uiGlobal_Browsers.execute("LoadInventory('" + inv + "', '" + storage + "', " + limit + ", " + vehicle_limit + ");");
        mp.gui.cursor.visible = true;
    },

    "Display_Search_inventory": (inv, storage, limit, vehicle_limit) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/envanter-sistem/Search-inventory.html");
            mp.game.graphics.transitionToBlurred(1);

        }
        uiGlobal_Browsers.execute("LoadInventory('" + inv + "', '" + storage + "', " + limit + ", " + vehicle_limit + ");");
        mp.gui.cursor.visible = true;
    },
    "SearchInventoryRespone": (func, dataslot, index, type, amount, inventoryname) => {

        //  mp.gui.chat.push("" + func + " " + dataslot + " " + index + " " + type + " " + amount + " " + inventoryname);
        switch (func) {
            case "addtoside":
                mp.events.callRemote("Search_Give_Item", dataslot, type, amount, index);
                break;
            case "addtoinv":
                mp.events.callRemote("Search_Take_Item", dataslot, type, amount, index);
                break;
            case "drop":
                mp.events.callRemote("JogarItem", index, type, 1, 3);
                break;
            case "drop-all":
                mp.events.callRemote("JogarItem", index, type, amount, 3);
                break;
            case "use":
                mp.events.callRemote("OnClientItemAction", index, amount, 3);
                break;
            case "slot":
                mp.events.callRemote("Search_InventoryChangeSlot", index, dataslot);
                break;
            case "stack":
                mp.events.callRemote("Search_SideInventoryStack", dataslot, index);/// SQL Jadid // SQL Ghabli
                break;
            case "stack_main_iv":
                mp.events.callRemote("Search_InventoryStack", dataslot, index);/// SQL Jadid // SQL Ghabli
                break;
            case "split":
                if (inventoryname == "sideInventory") {
                    mp.events.callRemote("Search_SideInventorySplit", index);
                } else {
                    mp.events.callRemote("Search_InventorySplit", index);
                }
                break;

            default:
                break;
        }
    },

    "HQ_Storage_Give_Item": (item_type, amount) => {
        mp.events.callRemote("HQ_Storage_Give_Item", item_type, amount);
    },

    "HQ_Storage_Take_Item": (item_type, amount) => {
        mp.events.callRemote("HQ_Storage_Take_Item", item_type, amount);
    },

    "Display_Player_Inventory": (items, character_money, limit, weight) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/envanter-sistem/inventory.html");
        }
        mp.events.callRemote("SetGroundPos", mp.players.local.getHeightAboveGround()-0.2);
        uiGlobal_Browsers.execute("updateBrowser('" + items + "', '"+ null+"', '"+ 0+"', '"+ null+"', '"+ false+"', '"+ null+"', '"+ false+"', '"+ null+"', '"+ 0+"', '"+ character_money+"', '"+ limit +"', '"+ weight +"');");
        mp.gui.cursor.visible = true;
    },

    "Storage_Give_Item": (slot,sqlid) => {
        mp.events.callRemote("Storage_Give_Item",slot, sqlid);
    },

    "Storage_Take_Item": (item_type, amount) => {
        mp.events.callRemote("Storage_Take_Item", item_type, amount);
    },

    "Display_Player_Inventory": (items, limit, weight) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/envanter-sistem/inventory.html");
            mp.game.graphics.transitionToBlurred(1);


        }
        mp.events.callRemote("SetGroundPos", mp.players.local.getHeightAboveGround()-0.2);
        uiGlobal_Browsers.execute("LoadInventory('" + items + "','"+ limit +"', '"+ weight +"');");
        mp.gui.cursor.visible = true;
    },

    "Display_Player_NotfMenu": (title, bigtext, description,html) => {
        if (uiGlobal_Notifiaction === undefined) {
            uiGlobal_Notifiaction = mp.browsers.new("package://files/karakter-sistem/notf.html");
        }
        if (html == undefined) { html = "";}
        uiGlobal_Notifiaction.execute("UpdateNotf('" +title +"','" +bigtext +"','"+description+"','"+html+"');");
        
    },
    "Destroy_NotfMenu": () => {
        if (uiGlobal_Notifiaction != undefined) {
            uiGlobal_Notifiaction.destroy();
            uiGlobal_Notifiaction = undefined;
        }
    },
    "Display_House_Storage": (inv, storage, limit, vehicle_limit) => {
        if (uiGlobal_Browsers === undefined) {
            uiGlobal_Browsers = mp.browsers.new("package://files/envanter-sistem/House-Inventory.html");
            mp.game.graphics.transitionToBlurred(1);

        }
        uiGlobal_Browsers.execute("LoadInventory('" + inv + "', '" + storage + "', " + limit + ", " + vehicle_limit + ");");
        mp.gui.cursor.visible = true;
    },

    "House_Storage_Give_Item": (item_type, amount) => {
        mp.events.callRemote("House_Storage_Give_Item", item_type, amount);
    },

    "House_Storage_Take_Item": (item_type, amount) => {
        mp.events.callRemote("House_Storage_Take_Item", item_type, amount);
    },

    "HouseInventoryRespone": (func, dataslot, index, type, amount, inventoryname) => {

        switch (func) {
            case "addtoside":
                mp.events.callRemote("House_", dataslot, type, amount, index);
                break;
            case "addtoinv":
                mp.events.callRemote("House_Storage_Take_Item", dataslot, type, amount, index);
                break;
            case "drop":
                mp.events.callRemote("JogarItem", index, type, 1,3);
                break;
            case "drop-all":
                mp.events.callRemote("JogarItem", index, type, amount,3);
                break;
            case "use":
                mp.events.callRemote("OnClientItemAction", index, amount,3);
                break;
            case "slot":
                mp.events.callRemote("House_InventoryChangeSlot", index, dataslot);
                break;
            case "stack":
                mp.events.callRemote("House_SideInventoryStack", dataslot, index);/// SQL Jadid // SQL Ghabli
                break; 
            case "stack_main_iv":
                mp.events.callRemote("House_InventoryStack", dataslot, index);/// SQL Jadid // SQL Ghabli
                break;
            case "split":
                if (inventoryname == "sideInventory") {
                    mp.events.callRemote("House_SideInventorySplit", index);
                } else {
                    mp.events.callRemote("House_InventorySplit", index);
                }
                break;

            default:
                break;
        }
    },

    "HqInventoryRespone": (func, dataslot, index, type, amount, inventoryname) => {

        switch (func) {
            case "addtoside":
                mp.events.callRemote("HQ_Storage_Give_Item", dataslot, type, amount, index);
                break;
            case "addtoinv":
                mp.events.callRemote("HQ_Storage_Take_Item", dataslot, type, amount, index);
                break;
            case "drop":
                mp.events.callRemote("JogarItem", index, type, 1,3);
                break;
            case "drop-all":
                mp.events.callRemote("JogarItem", index, type, amount,3);
                break;
            case "use":
                mp.events.callRemote("OnClientItemAction", index, amount,3);
                break;
            case "slot":
                mp.events.callRemote("HQ_InventoryChangeSlot", index, dataslot);
                break;
            case "stack":
                mp.events.callRemote("HQ_SideInventoryStack", dataslot, index);/// SQL Jadid // SQL Ghabli
                break; 
            case "stack_main_iv":
                mp.events.callRemote("HQ_InventoryStack", dataslot, index);/// SQL Jadid // SQL Ghabli
                break;
            case "split":
                if (inventoryname == "sideInventory") {
                    mp.events.callRemote("HQ_SideInventorySplit", index);
                } else {
                    mp.events.callRemote("HQ_InventorySplit", index);
                }
                break;

            default:
                break;
        }
    },


    "sideInventoryRespone": (func, dataslot, index, type, amount,inventoryname) => {


        switch (func) {
            case "addtoside":
                mp.events.callRemote("Storage_Give_Item", dataslot, type, amount,index);
                break;
            case "addtoinv":
                mp.events.callRemote("Storage_Take_Item", dataslot, type, amount, index);
                break;
            case "drop":
                mp.events.callRemote("JogarItem", index, type, 1,2);
                break;
            case "drop-all":
                mp.events.callRemote("JogarItem", index, type, amount,2);
                break;
            case "use":
                mp.events.callRemote("OnClientItemAction", index, amount,2);
                break;
            case "slot":
                mp.events.callRemote("Veh_InventoryChangeSlot", index, dataslot);
                break;
            case "stack":
                mp.events.callRemote("Veh_InventoryStack", dataslot, index);/// SQL Jadid // SQL Ghabli
                break;
            case "stack_main_iv":
                mp.events.callRemote("InventoryStack", dataslot, index);/// SQL Jadid // SQL Ghabli
                break;
            case "split":
                if (inventoryname == "sideInventory") {
                    mp.events.callRemote("veh_sideinventorysplit", index);
                } else {
                    mp.events.callRemote("veh_split", index);
                }
                break;
            default:
                break;
        }
    },

    "VehStream_SetVehicleDirtLevel": (entity, dirt) => {
        try {
            if (entity && mp.vehicles.exists(entity)) {
                if (entity !== undefined) {
                    entity.setDirtLevel(dirt);
                    if (entity.getPedInSeat(-1) == mp.players.local.handle) {
                        lastdirt = dirt;
                    }
                }
            }
        } catch (e) {
        }
    },

    "InventoryRespone": (func,dataslot, sqlid, type, amount) => {


        switch (func) {
            case "drop":
                mp.events.callRemote("JogarItem", sqlid, type, 1,1);
                break;
            case "drop-all":
                mp.events.callRemote("JogarItem", sqlid, type, amount,1);
                break;
            case "use":
                mp.events.callRemote("OnClientItemAction", sqlid, amount,1);
                break;
            case "slot":
                mp.events.callRemote("InventoryChangeSlot", sqlid, dataslot);
                break;
            case "stack":
                mp.events.callRemote("Main_InventoryStack", dataslot, sqlid);/// SQL Ghabli // SQL Jadid
                break;
            case "split":
                mp.events.callRemote("Split_Main", sqlid);/// SQL Ghabli // SQL Jadid
                break;
            case "drop_gun":
                mp.events.callRemote("drop_gun", sqlid);/// SQL Ghabli // SQL Jadid
                break;
            default:
                break;
        }
    },


    "InventoryService:ToggleClothing": (type) => {
        mp.events.callRemote("InventoryService:ToggleClothing", type);
    },
    
    "SetProgressBar": (value, name) => {

        if (uiProgressBar_Browsers === undefined) {
            uiProgressBar_Browsers = mp.browsers.new("package://files/progressbar/index.html");
        }

        uiProgressBar_Browsers.execute("StartProgressBar('" + value + "', '" + name + "')");

    },

    "DestroyProgressBar": () => {
        try {
            if (uiProgressBar_Browsers != undefined) {
                uiProgressBar_Browsers.destroy();
                uiProgressBar_Browsers = undefined;
            }
        } catch (e) {
            alert(e);
        }
        
    },

    "uiGeneralInput": (callbackId, title, placeHolder, description, type) => {

        if (uiGeneralStart_Browsers === undefined) {
            uiGeneralStart_Browsers = mp.browsers.new("package://files/giris-sistem/input.html");
        } else {
            uiGeneralStart_Browsers.destroy();
            uiGeneralStart_Browsers = undefined;
            uiGeneralStart_Browsers = mp.browsers.new("package://files/giris-sistem/input.html");
        }

        uiGeneralStart_Browsers.execute("DisplayDialogFunction('" + callbackId + "', '" + title + "', '" + placeHolder + "', '" + description + "', '" + type + "')");
        mp.gui.cursor.visible = true;

    },

    "death_screen_false": () => {
        mp.game.ui.displayHud(true);
        mp.game.gameplay.setFadeOutAfterDeath(false);
        mp.game.gameplay.disableAutomaticRespawn(true);
    }
});

mp.events.add('buygunlic', (data) => {
    mp.events.callRemote('buygunlic');
});

mp.events.add('client_input_response', (response, inputtext) => {

    uiGeneralStart_Browsers.destroy();
    uiGeneralStart_Browsers = undefined;
    mp.events.callRemote('uiInput_response', response, inputtext);
    mp.gui.cursor.visible = false;
});

mp.keys.bind(0x60, true, function () {
    if (logged === 0 || chatopened || TarayiciAcikmi == true || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;
    //mp.events.callRemote('CreateReserve'); // Calling server event "keypress:F2"
    lastCheck = new Date().getTime();
    //mp.gui.chat.push('F2 key is pressed. This message will be shown until you release the key, because "keyhold" is true.');
});

mp.events.add("SetDoorStat", (order,vehicle,doorid) => {
    switch (order) {
        case "OPEN":
            vehicle.setDoorOpen(doorid, false, false);
            break;
        case "CLOSE":
            vehicle.setDoorShut(doorid, false);
            break;
        default:
    }
});


var sk_markers = [];

mp.events.add('createCheckpoint', function (uid, type, position, scale, dimension, r, g, b, dir) {
    if (typeof sk_markers[uid] != "undefined") {
        sk_markers[uid].destroy();
        sk_markers[uid] = undefined;
    }
    if (dir != undefined) {
        sk_markers[uid] = mp.checkpoints.new(type, position, scale, {
            direction: dir,
            color: [r, g, b, 200],
            visible: true,
            dimension: dimension
        });
    } else {
        sk_markers[uid] = mp.markers.new(type, position, scale, {
            visible: true,
            dimension: dimension,
            color: [r, g, b, 255]
        });
    }
});

mp.events.add('deleteCheckpoint', function (uid) {
    if (typeof sk_markers[uid] == "undefined") return;
    sk_markers[uid].destroy();
    sk_markers[uid] = undefined;
});

mp.events.add('createWaypoint', function (x, y) {
    mp.game.ui.setNewWaypoint(x, y);
});

var workBlip = null;
mp.events.add('createWorkBlip', function (position) {
    if (workBlip != null) workBlip.destroy();
    workBlip = mp.blips.new(0, position, {
        name: "Checkpoint",
        scale: 1,
        color: 49,
        alpha: 255,
        drawDistance: 100,
        shortRange: false,
        rotation: 0,
        dimension: 0
    });
});

var WLBlip = null;
mp.events.add('createWLBlip', function (position) {
    if (WLBlip != null) WLBlip.destroy();
    WLBlip = mp.blips.new(0, position, {
        name: "Aranan",
        scale: 1,
        color: 1,
        alpha: 255,
        drawDistance: 100,
        shortRange: false,
        rotation: 0,
        dimension: 0
    });
});

mp.events.add('deleteWLBlip', function () {
    if (WLBlip != null) WLBlip.destroy();
    WLBlip = null;
});

mp.events.add('deleteWorkBlip', function () {
    if (workBlip != null) workBlip.destroy();
    workBlip = null;
});

let freezeMe = false;
let freezeVehicle = false;

mp.events.add("freeze", (bool) => {
    //freezeMe = bool;
    mp.players.local.freezePosition(bool);
});

mp.events.add("ParaIslemEvent", (islem, miktar) => {
    var deks = mp.browsers.new("package://files/para-hud-sistem/index.html");
    deks.execute(`ParaIslem(${miktar}, ${islem});`);
});

mp.events.add("DialogCagir", (baslik, icerik, buton1, buton2, islem) => {
    var dialogx = mp.browsers.new("package://files/dialog-sistem/index.html");
    dialogx.execute(`Dialog("${baslik}", "${icerik}", "${buton1}", "${buton2}", ${islem});`);
    mp.gui.cursor.visible = true;
});

mp.events.add("EvPanelCagir", (id) => {
    uiGlobal_Browsers = mp.browsers.new("package://files/ev-sistem/index.html");
    uiGlobal_Browsers.execute(`EvPanel(${id});`);
    mp.gui.cursor.visible = true;
});

mp.events.add("freezeEx", (bool) => {
    freezeMe = bool;
});

mp.events.add("freezeVehicle", (bool) => {
    //freezeMe = bool;
    freezeVehicle = bool;
});

var displayMessage = null;

mp.events.add("PucanjeStakla", () => {
    mp.game.audio.playSoundFrontend(-1, "Barge_Door_Glass", "dlc_h4_Prep_FC_Sounds", true);

});

mp.events.add("displayMessage", (string) => {
    //freezeMe = bool;
    displayMessage = string;
});

var bottomText = null;
var bottomTextTime = -1;
var bottomTextInterval = null;


const drawText = (text, position, options) => {
    options = {
        ...{
            align: 1,
            font: 4,
            scale: 0.3,
            outline: true,
            shadow: true,
            color: [255, 255, 255, 255]
        },
        ...options
    };

    const ui = mp.game.ui;
    const font = options.font;
    const scale = options.scale;
    const outline = options.outline;
    const shadow = options.shadow;
    const color = options.color;
    const wordWrap = options.wordWrap;
    const align = options.align;

    ui.setTextEntry("CELL_EMAIL_BCON");
    for (let i = 0; i < text.length; i += 99) {
        const subStringText = text.substr(i, Math.min(99, text.length - i));
        mp.game.ui.addTextComponentSubstringPlayerName(subStringText);
    }

    ui.setTextFont(font);
    ui.setTextScale(scale, scale);
    ui.setTextColour(color[0], color[1], color[2], color[3]);

    if (shadow) {
        mp.game.invoke(Natives.SET_TEXT_DROP_SHADOW);
        ui.setTextDropshadow(2, 0, 0, 0, 255);
    }

    if (outline) {
        mp.game.invoke("0x2513DFB0FB8400FE");
    }

    switch (align) {
        case 1:
            {
                ui.setTextCentre(true);
                break;
            }
        case 2:
            {
                ui.setTextRightJustify(true);
                ui.setTextWrap(0.0, position[0] || 0);
                break;
            }
    }

    if (wordWrap) {
        ui.setTextWrap(0.0, (position[0] || 0) + wordWrap);
    }

    ui.drawText(position[0] || 0, position[1] || 0);
}

mp.events.add("playerCreateWaypoint", (position) => 
{
    if (position.x !== undefined && position.y !== undefined) 
    {
       mp.events.callRemote('SaveWaypointPosition', position.x, position.y, position.z || 0);
    }
});

mp.events.add('playerCreateWaypoint', (x, y, z) => {
    if (x !== undefined && y !== undefined) {
        mp.events.callRemote('SaveWaypointPosition', x, y, z || 0);
    }
});

mp.events.add('playerRemoveWaypoint', () => {
    mp.events.callRemote('ClearWaypointPosition');
});

let isTaxiFare = false;
let isCustomer = false;
let currentToPay = 0;
let currentFare = 0;

mp.events.add("update_taxi_fare", (arg1, arg2, arg3, arg4) => {

    isTaxiFare = arg1;
    currentFare = arg2;
    currentToPay = arg3;
    isCustomer = arg4;

});

//var taxiFare = "Fare charge";
let taxiFare = "Tarifeniz";  
let taxiFareInfo = "Her 10 saniye için";  
let dollar = "$";  

let taxiCustomer = "Müşteri";  
let taxiCustomerInfo = "Ödeyecek";  
let taxiCustomerAsk = "Ödenecek Komisyon";  

const maxDistance = 25 * 25;
var lasthealth = 100;
mp.nametags.enabled = false;


var res = false;
var entity = null;

var res_2 = mp.game.graphics.getScreenActiveResolution(1, 1);

function getLookingAtEntity() {
    let startPosition = localPlayer.getBoneCoords(12844, 0.5, 0, 0);
    let secondPoint = mp.game.graphics.screen2dToWorld3d([res_2.x / 2, res_2.y / 2, (2 | 4 | 8)]);
    if (secondPoint == undefined) return null;

    startPosition.z -= 0.3;
    const result = mp.raycasting.testPointToPoint(startPosition, secondPoint, localPlayer, (2 | 4 | 8 | 16));
    

    if (typeof result !== 'undefined') {
        if (typeof result.entity.type === 'undefined') {return null; }
        if (result.entity.type == 'object' && result.entity.getVariable('TYPE') == undefined) { return null; }
        
        let entPos = result.entity.position;
        let lPos = localPlayer.position;
        if (mp.game.gameplay.getDistanceBetweenCoords(entPos.x, entPos.y, entPos.z, lPos.x, lPos.y, lPos.z, true) > 4) return null;
        return result.entity;
    }
    return null;
}

setInterval(() => {
    let currentFrameCount = mp.game.gameplay.getFrameCount();
    currentFPS = currentFrameCount - lastFrameCount;
    lastFrameCount = currentFrameCount;
}, 1000);

setInterval(() => {
    if (mp.players.local === null || mp.players.local === undefined || logged === 0) return;

    let player = mp.players.local;
    if (player.isSittingInAnyVehicle()) {
        let vehicle = mp.players.local.vehicle;

        if (vehicle != null && player.handle == vehicle.getPedInSeat(-1)) {
            if (uiVelo_Browsers != undefined) {
                if (velocimer_ui == false) {
                    uiVelo_Browsers.execute('toggleVehicle(true);');
                    velocimer_ui = true;
                }
               

                ui2_fuel = localPlayer.vehicle.getVariable('vehicle_fuel_client');
                let displaySpeed = Math.round(4.68 * vehicle.getSpeed());

                const vehicleHealth = vehicle.getEngineHealth();
                const healthPercentage = Math.round(vehicleHealth / 10);

                uiVelo_Browsers.execute(`updateSpeed(${displaySpeed});`);
                uiVelo_Browsers.execute(`updateDamage(${healthPercentage});`);
                uiVelo_Browsers.execute(`updateFuel(${ui2_fuel});`);

                // uiVelo_Browsers.execute('UpdateSpeed(' + displaySpeed + ',' + ui2_fuel + ',' + healthPercentage + ',' + vehicle.gear + ',' + vehicle.getDoorLockStatus()+');');

            }
        }

    } else {
        if (velocimer_ui == true && uiVelo_Browsers != undefined) {
            uiVelo_Browsers.execute('toggleVehicle(false);');
            velocimer_ui = false;
        }
    }
}, 50);


mp.events.add('notify', (type, msg, time) => {
    if (mp.players.local === null || mp.players.local === undefined/* || logged === 0*/) return;

    if (Bildirim !== undefined) {
        Bildirim.execute(`showToast('${type}', '${msg}', ${time})`);
    }
    else
    {
        Bildirim = mp.browsers.new("package://files/bildirim-sistem/index.html");
        Bildirim.execute(`showToast('${type}', '${msg}', ${time})`);
    }
});

const Natives = {
    IS_RADAR_HIDDEN: "0x157F93B036700462",
    IS_RADAR_ENABLED: "0xAF754F20EB5CD51A",
    SET_TEXT_OUTLINE: "0x2513DFB0FB8400FE"
};
let isMetric = false;
let minimap = {};
let streetName = "";
let zoneName = "";

function drawText2(text, drawXY, font, color, scale, alignRight = false) {
    mp.game.ui.setTextEntry("STRING");
    mp.game.ui.addTextComponentSubstringPlayerName(text);
    mp.game.ui.setTextFont(font);
    mp.game.ui.setTextScale(scale, scale);
    mp.game.ui.setTextColour(color[0], color[1], color[2], color[3]);
    mp.game.invoke(Natives.SET_TEXT_OUTLINE);

    if (alignRight) {
        mp.game.ui.setTextRightJustify(true);
        mp.game.ui.setTextWrap(0, drawXY[0]);
    }

    mp.game.ui.drawText(drawXY[0], drawXY[1]);
}
let IsInNCZ = false;
let NCZText = "";
mp.events.add('NCZ', (text) => {
    if (text == "Exit") {
        IsInNCZ = false;
    }
    else {
        NCZText = text;
        IsInNCZ = true;
    }
});

let EpochTime = "";
mp.events.add('EpochTime', (Time) => {
    EpochTime = Time;
});

// const maxDistancex = 25*25;
// const width = 0.03;
// const height = 0.0065;
// const border = 0.001;
// const color = [255,255,255,255];


setInterval(() => {
    if (localPlayer.getVariable("status") != undefined) {
        isMetric = mp.game.gameplay.getProfileSetting(227) == 1;
        minimap = getMinimapAnchor();

        const position = mp.players.local.position;
        let getStreet = mp.game.pathfind.getStreetNameAtCoord(position.x, position.y, position.z, 0, 0);
        zoneName = mp.game.ui.getLabelText(mp.game.zone.getNameOfZone(position.x, position.y, position.z));
        streetName = mp.game.ui.getStreetNameFromHashKey(getStreet.streetName);
        if (getStreet.crossingRoad && getStreet.crossingRoad != getStreet.streetName) streetName += ` / ${mp.game.ui.getStreetNameFromHashKey(getStreet.crossingRoad)}`;
    }
        
}, 500);



function getMinimapAnchor() {
    let sfX = 1.0 / 20.0;
    let sfY = 1.0 / 20.0;
    let safeZone = mp.game.graphics.getSafeZoneSize();
    let aspectRatio = mp.game.graphics.getScreenAspectRatio(false);
    let resolution = mp.game.graphics.getScreenActiveResolution(0, 0);
    let scaleX = 1.0 / resolution.x;
    let scaleY = 1.0 / resolution.y;

    let minimap = {
        width: scaleX * (resolution.x / (4 * aspectRatio)),
        height: scaleY * (resolution.y / 5.674),
        scaleX: scaleX,
        scaleY: scaleY,
        leftX: scaleX * (resolution.x * (sfX * (Math.abs(safeZone - 1.0) * 10))),
        bottomY: 1.0 - scaleY * (resolution.y * (sfY * (Math.abs(safeZone - 1.0) * 10))),
    };

    minimap.rightX = minimap.leftX + minimap.width;
    minimap.topY = minimap.bottomY - minimap.height;
    return minimap;
}

mp.events.add('HUD_Draw_stats', (stats) => {
    HUD_SHOW = stats;
});

function getWeaponInfo() {
    const weapon = mp.players.local.weapon;
    
    if (weapon && weapon !== 0xA2719263) {
        const totalAmmo = mp.players.local.getWeaponAmmo(weapon);
        const clipAmmo = mp.players.local.getAmmoInClip(weapon);
        const totalUpdatedAmmo = totalAmmo - clipAmmo;
        
        return {
            weapon: weapon,
            totalAmmo: totalUpdatedAmmo,
            clipAmmo: clipAmmo
        };
    }
    
    return null;
}


var HUD_SHOW = true;
mp.events.add('render', (nametags) => {
    frameCount++;
    try {

        mp.game.ui.hideHudComponentThisFrame(3);
        mp.game.ui.hideHudComponentThisFrame(4);
        mp.game.ui.hideHudComponentThisFrame(13);
        mp.game.ui.hideHudComponentThisFrame(2);        

        if(dlEnabled)
        {
            mp.vehicles.forEachInStreamRange((vehicle) => { 
                if(mp.players.local.position.subtract(vehicle.position).length() < 10)
                {
                    const drawPosition = [vehicle.position.x, vehicle.position.y, vehicle.position.z + 0.3];
                    mp.game.graphics.drawText(`~b~ID: ~w~${vehicle.remoteId}\n~b~Model: ~w~${mp.game.ui.getLabelText(mp.game.vehicle.getDisplayNameFromVehicleModel(vehicle.model))}\n~b~Pozisyon: ~w~${vehicle.position.x.toFixed(2)}, ${vehicle.position.y.toFixed(2)}, ${vehicle.position.z.toFixed(2)}\n`, drawPosition, { 
                        font: 0, 
                        color: [255, 255, 255, 185], 
                        scale: [0.25, 0.25], 
                        outline: true,
                        centre: false
                    });
                    mp.game.graphics.drawText(`\n\n\n~b~Rotasyon: ~w~${vehicle.getHeading().toFixed(2)}\n~b~Sağlık: ~w~${vehicle.getHealth()}`, drawPosition, { 
                        font: 0, 
                        color: [255, 255, 255, 185], 
                        scale: [0.25, 0.25], 
                        outline: true,
                        centre: false
                    });
                }
            }); 
        }

        mp.game.controls.disableControlAction(0, 48, true);
        if(mp.game.controls.isDisabledControlJustPressed(0, 48)) {
            if (logged === 0 || chatopened || TarayiciAcikmi == true || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;

            if(bigmap.status === 0) {

                mp.game.ui.setRadarZoom(0.0);
                bigmap.status = 1;
            
                bigmap.timer = setTimeout(() => {

                    mp.game.ui.setRadarBigmapEnabled(false, true);
                    mp.game.ui.setRadarZoom(1.0);

                    bigmap.status = 0;
                    bigmap.timer = null;
                    
                }, 10000);
                
            } else if(bigmap.status === 1) {
                if (logged === 0 || chatopened || TarayiciAcikmi == true || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;

                if(bigmap.timer != null) 
                {	
                    clearTimeout(bigmap.timer);
                    bigmap.timer = null;
                }

                mp.game.ui.setRadarBigmapEnabled(true, false);
                mp.game.ui.setRadarZoom(0.0);
                bigmap.status = 2;
                
                bigmap.timer = setTimeout(() => {

                    mp.game.ui.setRadarBigmapEnabled(false, true);
                    mp.game.ui.setRadarZoom(1.0);

                    bigmap.status = 0;
                    bigmap.timer = null;
                    
                }, 10000);

            } else {

                if(bigmap.timer != null) 
                {
                    clearTimeout(bigmap.timer);
                    bigmap.timer = null;
                }

                mp.game.ui.setRadarBigmapEnabled(false, false);
                mp.game.ui.setRadarZoom(1.0);
                bigmap.status = 0;
            }
        }


        if (mp.players.local === null || mp.players.local === undefined || logged == false)
            return;
        if (HUD_SHOW) {
            if (IsInNCZ) {
                drawText2(NCZText, [minimap.rightX + 0.01, minimap.bottomY - 0.061], 2, [255, 255, 255, 255], 0.3);
            }
        }

        if (CarryItem == true) {
            for (let i = 0; i < controlsToDisable.length; i++) {
                mp.game.controls.disableControlAction(2, controlsToDisable[i], true);
            }
        }


        if (localPlayer.isPlayingAnim("anim@heists@ornate_bank@grab_cash", "intro", 3) || localPlayer.isPlayingAnim("reaction@intimidation@1h", "intro", 3)) {
            mp.game.controls.disableControlAction(0, 24, true);
            mp.game.controls.disableControlAction(0, 257, true);
        }

        controls.disableControlAction(0, 243, true);

        if (!res) {
            resolution = mp.game.graphics.getScreenResolution(0, 0);
            if (resolution.x < 1920) {
                res_X = resolution.x;
                res_Y = resolution.y;
            }
            res = true;
        }


        if (controls.isDisabledControlJustPressed(0, 58)) {
            if (logged === 0 || chatopened || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;
            mp.events.call('pressgkey');
        }

        var player = mp.players.local;
        if (mp.players.local === undefined || mp.players.local === null)
            return;
        //var inVeh = player.isInVehicle();

        const graphics = mp.game.graphics;
        const screenRes = graphics.getScreenResolution(0, 0);

        if (lasthealth - player.getHealth() >= 5) {
            mp.events.callRemote("OnPlayerHealthChange", lasthealth - player.getHealth());
        }
        lasthealth = player.getHealth();


        if (chatopened && uiGlobal_Browsers != undefined && uiGeneralStart_Browsers != undefined && mp.gui.cursor.visible) {
            mp.game.controls.disableControlAction(2, 199, true);

        }

        if (mp.gui.cursor.visible == true && !chatopened) {
            mp.game.controls.enableControlAction(2, 249, true);
        }

        mp.game.player.setHealthRechargeMultiplier(0.0);
        mp.game.player.restoreStamina(100);
    


        if (logged != 0) {


            if (mp.players.local.hasBeenDamagedByAnyPed()) {
                mp.players.forEachInStreamRange((player, id) => {
                    if (player != mp.players.local) {
                        if (mp.players.local.hasBeenDamagedBy(player.handle, true)) {
                            mp.events.callRemote("DamageSystem_OnDamagedByPed", player, mp.players.local.getLastDamageBone(0));
                            mp.players.local.clearLastDamage();
                            return;
                        }
                    }
                });
                mp.players.local.clearLastDamage();
            }


            const controls = mp.game.controls;


            if (global.chatopened) {
                //DisableControl([0,16,17,21,22,23,24,25,26,28,29,30,31,32,33,34,35,37,44,45,50,53,54,55,58,68,69,70,71,75,79,86,91,140,141,142,199,257,278,279,280,281], true);
                mp.game.controls.disableAllControlActions(2);

                mp.game.controls.enableControlAction(2, 1, true);
                mp.game.controls.enableControlAction(2, 2, true);
                mp.game.controls.enableControlAction(2, 3, true);
                mp.game.controls.enableControlAction(2, 4, true);
                mp.game.controls.enableControlAction(2, 5, true);
                mp.game.controls.enableControlAction(2, 6, true);
                mp.game.controls.enableControlAction(2, 249, true);
                mp.game.controls.enableControlAction(2, 286, true);
                mp.game.controls.enableControlAction(2, 287, true);
                mp.game.controls.enableControlAction(2, 290, true);
                mp.game.controls.enableControlAction(2, 291, true);
                mp.game.controls.enableControlAction(2, 292, true);
                mp.game.controls.enableControlAction(2, 293, true);
                mp.game.controls.enableControlAction(2, 294, true);
                mp.game.controls.enableControlAction(2, 295, true);
                mp.game.controls.enableControlAction(2, 270, true);
                mp.game.controls.enableControlAction(2, 271, true);
                mp.game.controls.enableControlAction(2, 272, true);
                mp.game.controls.enableControlAction(2, 273, true);
                mp.game.controls.enableControlAction(2, 329, true);
                mp.game.controls.enableControlAction(2, 330, true);
            }

            if (mp.keys.isDown(17) === true) {
                CTRL = true;
            } else {
                CTRL = false;
            }

            
            if (localPlayer.getVariable('UI_Stats') == true) {

            nametags.forEach(nametag => {
                let [player, x, y, distance] = nametag;
                var isVisible = true;
                if (player.getVariable('nametag_visible') != null)
                    isVisible = player.getVariable('nametag_visible');

                let hitData;

                if (!player.isInAnyVehicle(false)) {
                    const startPosition = mp.players.local.getBoneCoords(12844, 0.3, 0.15, 0);
                    const endPosition = player.getBoneCoords(12844, 0.3, 0.15, 0);

                    hitData = mp.raycasting.testPointToPoint(startPosition, endPosition);

                    
                } else {
                    const startPosition = mp.players.local.getBoneCoords(12844, 0.3, 0.15, 0);
                    const endPosition = player.getBoneCoords(12844, 0.3, 0.50, 0);

                    hitData = mp.raycasting.testPointToPoint(startPosition, endPosition);

                    
                }
               
                
            

                if (isVisible && logged && !hitData) {
                   
                    if (distance <= maxDistance) {
                        
                        // const graphics = mp.game.graphics;
                        // const screenRes = graphics.getScreenResolution(0, 0);
                        
                        // nametags.forEach(nametag => {
                        //     let [player, x, y, distance] = nametag;
                            
                        //     if(distance <= maxDistance) {	   
                        //         let scale = (distance / maxDistance);
                        //         if(scale < 0.6) scale = 0.6;
                                
                        //         y -= scale * (0.005 * (screenRes.y / 1080));
                                
                        //         mp.game.graphics.drawText(player.name.replace('_', ' '), [x, y],
                        //         {
                        //             font: 4,
                        //             color: [255, 255, 255, 255],
                        //             scale: [0.4, 0.4],
                        //             outline: true
                        //         });
                        //     }
                        // })

                        // if (distance <= 10 * 10 && player.getVariable('badgename') != undefined && player.getVariable('badgeon') == true) {
                        //     mp.game.graphics.drawText("~b~" + player.getVariable('badgename') + " #" + player.getVariable('badgenumber') + "", [x , y - (0.02)], {
                        //         font: 4,
                        //         color: [255, 255, 255, 255],
                        //         scale: [scale * 0.6, scale * 0.6],
                        //         outline: true,
                        //         centre: false
                        //     });
                        // }

                        // var health = player.getHealth();
                        // health = health < 100 ? 0 : ((health - 100) / 100);
                        // var color2 = color;
                        // if (player.getVariable('nametag_color') != null) {
                        //     color2 = player.getVariable('nametag_color');

                        //     if (color2 == "red")
                        //         color = [255, 0, 0, 255];
                        //     else if (color2 == "white")
                        //         color = [255, 255, 255, 255];
                        // }
                        

                        // if (player.getVariable('isadmininvicible') == true) {

                        //     mp.game.graphics.drawText(' ', [x + ((0 * 0.5) * 0.25), y + (0.008 * scale)], {
                        //         font: 0,
                        //         color: color,
                        //         scale: [scale * 0.6, scale * 0.6],
                        //         outline: true,
                        //         centre: false
                        //     });

                        // }
                        // else {

                        //     if (player.getVariable('admin_shared_name') === 0) {
                        //         var skip = 0;
                        //         color = [255, 255, 255, 255];
                        //     if (player.getVariable('using_mask')) {
                        //         mp.game.graphics.drawText("Maskeli " + player.getVariable('unknow_sqlid'), [x + ((0 * 0.5) * 0.25), y + (0.008 * scale)], {
                        //             font: 0,
                        //             color: color,
                        //             scale: [scale * 0.6, scale * 0.6],
                        //             outline: true,
                        //             centre: false
                        //         });
                        //     } else {
                        //         for (let i = 0; i < 100; i++) {
                        //             if (player.getVariable('unknow_sqlid') == mp.players.local.getVariable('know_player_' + i)) {
                        //                 mp.game.graphics.drawText("[" + player.getVariable('remoteID') + "] " + player.name.replace("_", " "), [x + ((0 * 0.5) * 0.25), y + (0.008 * scale)], {
                        //                     font: 0,
                        //                     color: color,
                        //                     scale: [scale * 0.6, scale * 0.6],
                        //                     outline: true,
                        //                     centre: false
                        //                 });

                        //                 skip = 1;
                        //             }
                        //         }

                        //         if (skip == 0) {
                        //             mp.game.graphics.drawText("" + player.name.replace("_", " "), [x + ((0 * 0.5) * 0.25), y + (0.008 * scale)], {
                        //                 font: 0,
                        //                 color: color,
                        //                 scale: [scale * 0.6, scale * 0.6],
                        //                 outline: true,
                        //                 centre: false
                        //             });
                        //         }
                        //     }
                        //     } else {
                        //         if (player.getVariable('admin_shared_color') === 2) {
                        //             color = [15, 92, 149, 255];
                        //         } else if (player.getVariable('admin_shared_color') === 1) {
                        //             color = [156, 0, 0, 255];
                        //         } else color = [177, 5, 185, 255];

                        //         mp.game.graphics.drawText('~r~[' + adminrank[(player.getVariable('admin_level')-1)].toString()+']~w~ ' + player.getVariable('admin_shared_name'), [x + ((0 * 0.5) * 0.25), y + (0.008 * scale)], {
                        //             font: 4,
                        //             color: color,
                        //             scale: [scale * 0.6, scale * 0.6],
                        //             outline: true,
                        //             centre: false
                        //         });

                        //         }
                        //     if (player.getVariable("enableChatInput") === true) {
                        //     mp.game.graphics.drawText("[...]", [x + ((0 * 0.5) * 0.25), y - (0.035 * scale)], { 
                        //         font: 4,
                        //         color: [194, 100, 0, 255],
                        //         scale: [scale * 0.8, scale * 0.8],
                        //         outline: true,
                        //         centre: false
                        //     });
                        //     }
                        //     else if (player.getVariable("emoteText") !== "") {
                        //         mp.game.graphics.drawText(player.getVariable("emoteText"), [x, y - (0.011)], {
                        //             font: 4,
                        //             color: [194, 162, 218, 255],
                        //             scale: [scale * 0.45, scale * 0.45],
                        //             outline: true,
                        //             centre: false
                        //         });
                        //     }
                        //     else if (player.getVariable('Injured') == 1) {

                        //         mp.game.graphics.drawText("YARALI", [x, y - (0.011)], {
                        //             font: 4,
                        //             color: [218, 69, 69, 255],
                        //             scale: [scale * 0.45, scale * 0.45],
                        //             outline: true,
                        //             centre: false
                        //         });
                        //     }
                        //  }                           
                    }
                }
            })
            }
            


            if (freezeMe) {
                mp.game.controls.disableAllControlActions(2);

                mp.game.controls.enableControlAction(2, 1, true);
                mp.game.controls.enableControlAction(2, 2, true);
                mp.game.controls.enableControlAction(2, 3, true);
                mp.game.controls.enableControlAction(2, 4, true);
                mp.game.controls.enableControlAction(2, 5, true);
                mp.game.controls.enableControlAction(2, 6, true);
                mp.game.controls.enableControlAction(2, 249, true);
                mp.game.controls.enableControlAction(2, 286, true);
                mp.game.controls.enableControlAction(2, 287, true);
                mp.game.controls.enableControlAction(2, 290, true);
                mp.game.controls.enableControlAction(2, 291, true);
                mp.game.controls.enableControlAction(2, 292, true);
                mp.game.controls.enableControlAction(2, 293, true);
                mp.game.controls.enableControlAction(2, 294, true);
                mp.game.controls.enableControlAction(2, 295, true);
                mp.game.controls.enableControlAction(2, 270, true);
                mp.game.controls.enableControlAction(2, 271, true);
                mp.game.controls.enableControlAction(2, 272, true);
                mp.game.controls.enableControlAction(2, 273, true);
                mp.game.controls.enableControlAction(2, 329, true);
                mp.game.controls.enableControlAction(2, 330, true);
                mp.game.controls.enableControlAction(2, 200, true);

                mp.game.controls.disableControlAction(2, 71, true);
                mp.game.controls.disableControlAction(2, 72, true);

                mp.game.controls.disableControlAction(2, 75, true);

            }

            if (bottomTextTime != -1) {
                mp.game.ui.setTextFont(7);
                mp.game.ui.setTextEntry2("STRING");
                mp.game.ui.addTextComponentSubstringPlayerName(bottomText);
                mp.game.ui.drawSubtitleTimed(1, true);
            }


            if (logged) {


                if (!localPlayer.isInAnyVehicle(false) && !localPlayer.isDead()) {
                    entity = getLookingAtEntity();
                    //getNearestObjects();
                    
                } else {
                    entity = null;
                }
    

                if (freezeVehicle) {
                    mp.game.controls.disableControlAction(2, 71, true);
                    mp.game.controls.disableControlAction(2, 72, true);
                }

                if (mp.game.invoke(getNative('IS_CUTSCENE_ACTIVE'))) {
                    mp.game.invoke(getNative('STOP_CUTSCENE_IMMEDIATELY'))
                }

                if (mp.game.invoke(getNative('GET_RANDOM_EVENT_FLAG'))) {
                    mp.game.invoke(getNative('SET_RANDOM_EVENT_FLAG'), false);
                }

                if (mp.game.invoke(getNative('GET_MISSION_FLAG'))) {
                    mp.game.invoke(getNative('SET_MISSION_FLAG'), false);
                }

                mp.game.ui.hideHudComponentThisFrame(6);
                mp.game.ui.hideHudComponentThisFrame(7);
                mp.game.ui.hideHudComponentThisFrame(8);
                mp.game.ui.hideHudComponentThisFrame(9);


                mp.game.graphics.drawLightWithRange(1137, -1542, 48, 255, 255, 255, 25, 1);
                mp.game.graphics.drawLightWithRange(1140, -1578, 41, 255, 255, 255, 25, 1);
                mp.game.graphics.drawLightWithRange(-1019, -2797, 29, 255, 255, 255, 40, 0.8);
                mp.game.graphics.drawLightWithRange(-1055.307, -2806.795, 22.5, 255, 255, 255, 40, 0.8);
                mp.game.graphics.drawLightWithRange(-1067.206, -2799.9325, 22.5, 255, 255, 255, 40, 0.8);
                mp.game.graphics.drawLightWithRange(-1056, -2786, 25, 255, 255, 255, 40, 0.8);
                mp.game.graphics.drawLightWithRange(-1090, -2781, 25, 255, 255, 255, 40, 1);

                var color = [255, 255, 255, 150];

          if (mp.players.local.getVariable("Injured") > 0) 
            {
                if (mp.players.local.getVariable("Injured") == 1) 
                {
                    if (mp.players.local.getVariable("InjuredTime") > 0) {
                        mp.game.graphics.drawText("~w~Yaralısınız, yerden kalkmanıza kalan süre:~g~ " + mp.players.local.getVariable("InjuredTime").toString() + " saniye", [(res_X / 2) / res_X, (res_Y - 102) / res_Y], {
                            font: 4,
                            color: [255, 255, 255, 220 - 20],
                            scale: [0.54, 0.54],
                            outline: true,
                            shadow: true,
                            centre: false
                        });



                    }
                }
            }

                if (jail_time > 0) {
                    mp.game.graphics.drawText("Kalan: " + jail_time.toString() + " Saniye", [0.059 + 0.032, 0.776], {

                        font: 0,

                        color: [255, 255, 255, 255],

                        scale: [0.27, 0.27],

                        outline: false

                    });
                }

                mp.game.graphics.drawText(mp.players.local.getVariable("SubTitle"), [(res_X / 2) / res_X, (res_Y - 120) / res_Y], {
                    font: 0,
                    color: [255, 255, 255, 210],
                    scale: [0.42, 0.42],
                    outline: false,
                    centre: false
                });

                if (isTaxiFare && localPlayer.isInAnyVehicle(true)) {
                    drawText(taxiFare, [(res_X - 10) / res_X, 0.60 - 0.31], {
                        scale: 0.6,
                        color: [115, 186, 131, 255],
                        font: 4,
                        align: 2,
                        shadow: false,
                        outline: true
                    });

                    drawText(taxiFareInfo, [(res_X - 10) / res_X, 0.64 - 0.31], {
                        scale: 0.4,
                        color: [255, 255, 255, 255],
                        font: 4,
                        align: 2,
                        shadow: false,
                        outline: true
                    });

                    drawText(dollar + `${currentFare}`, [(res_X - 10) / res_X, 0.667 - 0.31], {
                        scale: 0.7,
                        color: [255, 255, 255, 255],
                        font: 4,
                        align: 2,
                        shadow: false,
                        outline: true
                    });

                    drawText(taxiCustomer, [(res_X - 10) / res_X, 0.740 - 0.31], {
                        scale: 0.6,
                        color: [115, 186, 131, 255],
                        font: 4,
                        align: 2,
                        shadow: false,
                        outline: true
                    });

                    if (isCustomer == true) {
                        drawText(taxiCustomerAsk, [(res_X - 10) / res_X, 0.784 - 0.31], {
                            scale: 0.4,
                            color: [255, 255, 255, 255],
                            font: 4,
                            align: 2,
                            shadow: false,
                            outline: true
                        });
                    } else {
                        drawText(taxiCustomerInfo, [(res_X - 10) / res_X, 0.784 - 0.31], {
                            scale: 0.4,
                            color: [255, 255, 255, 255],
                            font: 4,
                            align: 2,
                            shadow: false,
                            outline: true
                        });
                    }

                    drawText(dollar + `${currentToPay}`, [(res_X - 10) / res_X, 0.808 - 0.31], {
                        scale: 0.7,
                        color: [255, 255, 255, 255],
                        font: 4,
                        align: 2,
                        shadow: false,
                        outline: true
                    });
                }
            }
        }
    }catch (err) {
        mp.game.graphics.notify('RE:' + err.message);
    }
});



var CTRL = false;

var onSubmitGeneric = function(string) {
    mp.events.call('destroyBrowser');
    mp.events.callRemote('new_character_name', string);

};


let velocimer_ui = false;


mp.events.add("updateRankBar", (currentRankLimit, nextRankLimit, playersPreviousXP, playersCurrentXP, rank) => {
    if (!mp.game.graphics.hasHudScaleformLoaded(19)) {
        mp.game.graphics.requestHudScaleform(19);
        while (!mp.game.graphics.hasHudScaleformLoaded(19)) mp.game.wait(0);
    }

    mp.game.graphics.pushScaleformMovieFunctionFromHudComponent(19, "SET_COLOUR");
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(116); //Active bar color
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(123); //Background bar color
    mp.game.graphics.popScaleformMovieFunctionVoid();


    mp.game.graphics.pushScaleformMovieFunctionFromHudComponent(19, "SET_RANK_SCORES");
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(currentRankLimit); //current rank limit
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(nextRankLimit); //next rank limit
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(playersPreviousXP); //players previous xp
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(playersCurrentXP); //players current xp
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(rank); //rank
    mp.game.graphics.popScaleformMovieFunctionVoid();

    mp.game.graphics.pushScaleformMovieFunctionFromHudComponent(19, "OVERRIDE_ANIMATION_SPEED");
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(2000);
    mp.game.graphics.popScaleformMovieFunctionVoid();
});
//var radio_status = false;
var radio_html = undefined;


mp.events.add('Toggle_Radio', () => {
    mp.events.callRemote('Toggle_Radio');
});

mp.events.add('SetFreq', (freq) => {
    mp.events.callRemote('setfreq', freq);
    if (radio_html != undefined) {
        radio_html.destroy();
        radio_html = undefined;
       // radio_status == false;
        mp.gui.cursor.visible = false;
    }
});

mp.events.add('Toggle_GUI_Radio', (freq) => {
    if (radio_html == undefined) {
        radio_html = mp.browsers.new("package://files/radyo-sistem/radio.html");
        radio_html.execute("setonscreen(" + freq + ")");

        //radio_status = true;
        mp.gui.cursor.visible = true;
    } else if (radio_html != undefined) {
        //   radio_status = false;
        mp.gui.cursor.visible = false;
        radio_html.destroy();
        radio_html = undefined;

    }
});

setInterval(() => {
    if (mp.keys.isDown(0x42) === true && mp.keys.isDown(0x12) === true) { // 113 is the key code for F2
        if (logged === 0 || chatopened || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 1000) return;
        mp.events.callRemote('Toggle_GUI_Radio');
    } 
}, 500);

const currentWeapon = () => mp.game.invoke(getNative("GET_SELECTED_PED_WEAPON"), localPlayer.handle);

mp.events.add('playerWeaponShot', (targetPosition, targetEntity) => {
    var current = currentWeapon();
    var ammo = mp.game.invoke(getNative("GET_AMMO_IN_PED_WEAPON"), localPlayer.handle, current);
    //mp.gui.execute(`HUD.ammo=${ammo};`);
    mp.events.callRemote('playerTakeoffWeapon', current, ammo);

    const weaponData = getWeaponInfo();
    if (weaponData) {
        if (uiVelo_Browsers !== undefined) {
            uiVelo_Browsers.execute(`toggleAmmo(true);`);
            uiVelo_Browsers.execute(`updateAmmo("${weaponData.totalAmmo}", "${weaponData.clipAmmo}");`);
        }
        else
        {
            uiVelo_Browsers.execute(`toggleAmmo(false);`);
        }
    }       
    
});


mp.game.player.setMeleeWeaponDefenseModifier(0.25);
mp.game.player.setWeaponDefenseModifier(1.3);

var resistStages = {
    0: 0.0,
    1: 0.05,
    2: 0.07,
    3: 0.1,
};

mp.events.add("setResistStage", function (stage) {
    mp.game.player.setMeleeWeaponDefenseModifier(0.25 + resistStages[stage]);
    mp.game.player.setWeaponDefenseModifier(1.3 + resistStages[stage]);
});

mp.events.add("getNumberOfTextureVariations", function (componentId, drawableId) {
    
    mp.gui.chat.push(localPlayer.getNumberOfTextureVariations(componentId, drawableId) + "");

});

   // setInterval(() => {

   // }, 200);


// Key CODE's from https://docs.microsoft.com/en-us/windows/desktop/inputdev/virtual-key-codes
// 0x71 is the F2 key code

mp.events.add('Update_Players', (count,max) => {
    if (uiVelo_Browsers != undefined) {

        uiVelo_Browsers.execute(`setplayeronline(` + count+`,`+max+`)`);
    }
});

mp.events.add('Show_Cursor', () => {
    mp.gui.cursor.visible = true;
    cursor_status = true;
});

mp.keys.bind(0x71, true, function() {
    if (chatopened || TarayiciAcikmi == true || menu_libary === true || new Date().getTime() - lastCheck < 1000) return;
    mp.gui.cursor.visible = !mp.gui.cursor.visible;
});


mp.keys.bind(0x0D, true, (player) => { // If Chat was triggered
    mp.events.call('closeChat');
});


mp.keys.bind(0x26, true, (player) => { // If Chat was triggered3
    if (chatopened == false) return;
    mp.events.call('getPreviousMessage');
});
mp.keys.bind(0x26, true, (player) => { // If Chat was triggered3

    if (chatopened === false) mp.events.call('KEY_ARROW_UP');
});

mp.keys.bind(0x28, true, (player) => { // If Chat was triggered
    if (chatopened == false) return;
    mp.events.call('getNextMessage');
});
mp.keys.bind(0x54, true, (player) => { // If Chat was triggered
    if (logged === 0 || global.circleOpen || chatopened || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100)
    {
        return;
    }
    toggleChat(true);
    chatopened = true;
});

function toggleChat(toggle) {
    global.chatopened = toggle;
    global.isChat = toggle;
    mp.events.callRemote('enableChatInput', toggle);
    chat.execute("enableChatInput('" + toggle + "');");
    mp.gui.cursor.visible = toggle;
}

mp.keys.bind(0x0D, true, (player,) => { // If Chat was stopped.
    if (chatopened) {
        chatopened = false;
        mp.events.callRemote("TriggerIsTypingProcess", false);
    }
});

mp.keys.bind(0x1B, false, function () {
    if (logged === 0 || chatopened || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;
    if (localPlayer.ispaymentopen != undefined && localPlayer.ispaymentopen == true) {
      localPlayer.ispaymentopen = false;
      mp.gui.cursor.visible = false;
      if (uiGlobal_Browsers != undefined) {
        uiGlobal_Browsers.destroy();
        uiGlobal_Browsers = undefined; // set uiGlobal_Browsers to undefined
        mp.gui.cursor.visible = false;
      }
      mp.events.call('forceCloseChat');
      mp.events.callRemote("TriggerIsTypingProcess", false);
      mp.events.callRemote('keypress:bspc');
      return;
    }
    if (uiGlobal_Browsers != undefined) {
      mp.game.ui.setPauseMenuActive(false); // disable the GTA 5 menu
      if (uiGlobal_Browsers.browser != undefined) {
        uiGlobal_Browsers.browser.destroy();
        mp.gui.cursor.visible = false;
      }
      uiGlobal_Browsers.destroy();
      uiGlobal_Browsers = undefined; // set uiGlobal_Browsers to undefined
      mp.gui.cursor.visible = false;
      return;
    } 
    mp.game.ui.setPauseMenuActive(true); // enable the GTA 5 menu
  });

mp.keys.bind(0x30, true, function() {
    if (logged === 0 || chatopened || TarayiciAcikmi == true || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;
    if (mp.players.local.isFalling()) {
        return;
    }
    else mp.events.callRemote('keypress:0');

});

mp.keys.bind(0x31, true, function() {
    if (logged === 0 || chatopened || TarayiciAcikmi == true || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;

    mp.events.callRemote('keypress:1');

});
mp.keys.bind(0x32, true, function() {
    if (logged === 0 || chatopened || TarayiciAcikmi == true || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;

    mp.events.callRemote('keypress:2');

});
mp.keys.bind(0x33, true, function() {
    if (logged === 0 || chatopened || TarayiciAcikmi == true || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;

    mp.events.callRemote('keypress:3');

});
mp.keys.bind(0x34, true, function() {
    if (logged === 0 || chatopened || TarayiciAcikmi == true || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;

    mp.events.callRemote('keypress:4');

});
mp.keys.bind(0x35, true, function() {
    if (logged === 0 || chatopened || TarayiciAcikmi == true || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;

    mp.events.callRemote('keypress:5');

});
mp.keys.bind(0x36, true, function() {
    if (logged === 0 || chatopened || TarayiciAcikmi == true || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;

    mp.events.callRemote('keypress:6');

});
mp.keys.bind(0x37, true, function() {
    if (logged === 0 || chatopened || TarayiciAcikmi == true || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;

    mp.events.callRemote('keypress:7');

});
mp.keys.bind(0x38, true, function() {
    if (logged === 0 || chatopened || TarayiciAcikmi == true || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;

    mp.events.callRemote('keypress:8');

});
mp.keys.bind(0x39, true, function() {
    if (logged === 0 || chatopened || TarayiciAcikmi == true || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;

    mp.events.callRemote('keypress:9');

});


mp.keys.bind(0x72, true, function() {
    if (logged === 0 || chatopened || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;
    mp.events.callRemote('keypress:F1'); // Calling server event "keypress:F2"
    //mp.gui.chat.push('F2 key is pressed. This message will be shown until you release the key, because "keyhold" is true.');
});

mp.keys.bind(0x73, true, function() {
    if (logged === 0 || chatopened || TarayiciAcikmi == true || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;
    mp.events.callRemote('keypress:F4');
});

mp.keys.bind(0x74, true, function() {
    if (logged === 0 || chatopened || TarayiciAcikmi == true || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;
    mp.events.callRemote('KeyPress:F5');
    lastCheck = new Date().getTime();
});

mp.keys.bind(0x75, true, function() {
    if (logged === 0 || chatopened || TarayiciAcikmi == true || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;
    mp.events.callRemote('KeyPress:F6');
    lastCheck = new Date().getTime();
});

mp.keys.bind(0x76, true, function() {
    if (logged === 0 || chatopened || TarayiciAcikmi == true || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;
    mp.events.callRemote('KeyPress:F7');
    lastCheck = new Date().getTime();
});
mp.keys.bind(0x78, true, function () {
    if (logged === 0 || chatopened || TarayiciAcikmi == true || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;
    mp.events.callRemote('KeyPress:F9');
    lastCheck = new Date().getTime();
});
mp.keys.bind(0x79, true, function () {
    if (logged === 0 || chatopened || TarayiciAcikmi == true || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;
    mp.events.callRemote('KeyPress:F10');
    lastCheck = new Date().getTime();
});
// 0x59 is the Y key code
mp.keys.bind(0x59, true, function() {
    if (logged === 0 || chatopened || TarayiciAcikmi == true || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;

    mp.events.callRemote('keypress:Y');
    lastCheck = new Date().getTime();

});

mp.keys.bind(0x4A, true, function() {
    if (logged === 0 || chatopened || TarayiciAcikmi == true || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;

    mp.events.callRemote('keypress:J');
    lastCheck = new Date().getTime();

});


// 0x49 is the O key code
mp.keys.bind(0x4F, true, function() {
    if (logged === 0 || chatopened || TarayiciAcikmi == true || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;

    mp.events.callRemote('keypress:O');
    lastCheck = new Date().getTime();
});

// 0x49 is the u key code
mp.keys.bind(0x55, true, function() {
    if (logged === 0 || chatopened || TarayiciAcikmi == true || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;

   // mp.events.callRemote('keypress:U');
    
    
    //OpenCircle('animation', 0); geçersiz fonk.
    lastCheck = new Date().getTime();
});

// 0x49 is the I key code
mp.keys.bind(0x49, true, function() {
    if (logged === 0 || chatopened || TarayiciAcikmi == true || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;

    mp.events.callRemote('keypress:I');
    lastCheck = new Date().getTime();
});

// 0x48 is the H key code
mp.keys.bind(0x48, true, function() {
    if (logged === 0 || chatopened || TarayiciAcikmi == true || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;

    mp.events.callRemote('keypress:H');
    lastCheck = new Date().getTime();
});

// 0x4B is the K key code
mp.keys.bind(0x4B, true, function() {

    if (logged === 0 || chatopened || TarayiciAcikmi == true || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;
    mp.events.callRemote('keypress:K');
    lastCheck = new Date().getTime();

});

// 0x45 is the E key code
mp.keys.bind(0x45, true, function() {
    if (logged === 0 || chatopened || TarayiciAcikmi == true || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;
    mp.vehicles.forEachInStreamRange((vehicle) => {
        let trunk = vehicle.getWorldPositionOfBone(vehicle.getBoneIndexByName('door_dside_r'));
        if (calcDist(localPlayer.position, trunk) < 1.2 && mp.game.vehicle.getDisplayNameFromVehicleModel(vehicle.getModel()) == "SPEEDO") {
            lastCheck = new Date().getTime();
            mp.events.callRemote('Farm_Condition');
            return;
        }
    });
    if (new Date().getTime() - lastCheck < 100) {
        return;
    }
    mp.events.callRemote('keypress:E');
    lastCheck = new Date().getTime();
    
});

// 0x4D is the M key code
mp.keys.bind(0x4D, true, function() {
    if (logged === 0 || chatopened || TarayiciAcikmi == true || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;
    
    if(entity != null)
    {
        if(entity.type == 'player')
        {

            OpenCircle('player', 0);
        }
        else if(entity.type == 'vehicle')
        {
            OpenCircle('vehicle', 0);

        }
    } else {
        mp.events.callRemote('house_KeyM');
    }
    lastCheck = new Date().getTime();
});

// 0x45 is the L key code
mp.keys.bind(0x4C, true, function() {
    if (logged === 0 || chatopened || TarayiciAcikmi == true || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;
    mp.events.callRemote('keypress:L');
    lastCheck = new Date().getTime();
});
let ui_enable = false;
// 0x45 is the INSERT key code
mp.keys.bind(0xC0, true, function () {
    if (ui_enable) {
        mp.events.call("Destroy_Character_Menu");
        ui_enable = false;
        return;
    }
    if (logged === 0 || chatopened || TarayiciAcikmi == true || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;
    ui_enable = true;
    mp.events.callRemote('keypress:INSERT');
    lastCheck = new Date().getTime();
});


//
// G Passege
//
function calcDist(v1, v2) {
    return mp.game.system.vdist(
        v1.x,
        v1.y,
        v1.z,
        v2.x,
        v2.y,
        v2.z
    );
}


mp.keys.bind(0x77, false, (player) => {
    var time = mp.game.time.getLocalTime(1, 1, 1, 1, 1, 1);
    var screenName = "NIVA-" + time.year + "-" + time.month + "-" + time.day + "-" + time.hour + "-" + time.minute + "-" + time.second + ".png";
    mp.gui.takeScreenshot(screenName, 1, 100, 0);
    mp.game.graphics.notify("~b~Başarıyla ekran görüntüsü alındı: \n" +
        "~s~" + screenName + "\n" +
        "~g~RAGEMP\\screenshots");
});




mp.events.add("StopVehicle", () => {
    if (localPlayer.vehicle) {
        localPlayer.vehicle.setHalt(1.5, 1, false);
    }
});

mp.keys.bind(0x25, true, function() { //Left indicator

    if (signal1 && localPlayer.vehicle) {
        signal1 = false;

        localPlayer.vehicle.setIndicatorLights(1, false);
    } else

    if (signal2 && localPlayer.vehicle) {


        localPlayer.vehicle.setIndicatorLights(1, true);
        signal1 = true;

    } else if (localPlayer.vehicle) {
 
        localPlayer.vehicle.setIndicatorLights(1, true);
        signal1 = true;

    }
});

mp.keys.bind(0x27, true, function() { // Right Indicator
    if (signal2 && localPlayer.vehicle) {
        signal2 = false;
        localPlayer.vehicle.setIndicatorLights(0, false);
    } else
    if (signal1 && localPlayer.vehicle) {

        localPlayer.vehicle.setIndicatorLights(0, true);

        signal2 = true;
    } else if (localPlayer.vehicle) {
        localPlayer.vehicle.setIndicatorLights(0, true);
        signal2 = true;
    }
});

let blinkersOn = false;

mp.events.add("CarBlinkers", () => {
    if (localPlayer.vehicle) {
        if (blinkersOn) {
            localPlayer.vehicle.setIndicatorLights(1, false);
            localPlayer.vehicle.setIndicatorLights(0, false);
            blinkersOn = false;
        } else {
            localPlayer.vehicle.setIndicatorLights(1, true);
            localPlayer.vehicle.setIndicatorLights(0, true);
            blinkersOn = true;
        }
    }
});

mp.events.add("getPedOverlay", (cash) => {

    let featureData = [];
    for (let i = 0; i < 20; i++) mp.events.callRemote("Get_Feature_Data", i, mp.game.ped.getNumHeadOverlayValues(i));

});

let customBrowser = undefined;
let parameters = [];

mp.events.add('createBrowser', (arguments) => {
    // Check if there's a browser already opened
    if (customBrowser === undefined) {
        // Save the parameters
        parameters = arguments.slice(1, arguments.length);

        // Create the browser
        customBrowser = mp.browsers.new(arguments[0]);
    }
});

mp.events.add('browserDomReady', (browser) => {
    if (customBrowser === browser) {

        mp.gui.cursor.visible = true;

        if (parameters.length > 0) {

            mp.events.call('executeFunction', parameters);
        }
    }
});

mp.events.add('executeFunction', (arguments) => {

    let input = '';

    for (let i = 1; i < arguments.length; i++) {
        if (input.length > 0) {
            input += ', \'' + arguments[i] + '\'';
        } else {
            input = '\'' + arguments[i] + '\'';
        }
    }


    customBrowser.execute(`${arguments[0]}(${input});`);
});


mp.events.add('Cloth_Store', (id) => {

    
    switch (id) {
        case 0:
            if (uiGlobal_Browsers != undefined) {
                uiGlobal_Browsers.destroy();
                uiGlobal_Browsers = undefined;
            }
            mp.events.call("ps_DestroyCamera");

            mp.gui.cursor.visible = false;
            break;
        default:
            mp.events.callRemote("Cloth_Store", id);
            
            break;
    }
});

mp.events.add('BackToMainClothMenu', () => {
    mp.events.callRemote("BackToMainClothMenu" );
    if (uiGlobal_Browsers != undefined) {
        uiGlobal_Browsers.destroy();

        setTimeout(function () {
            uiGlobal_Browsers = mp.browsers.new("package://files/kiyafet-sistem/Main.html");
        }, 300);
    }
    mp.gui.cursor.visible = true;
});





mp.events.add('Preview_Clothes', (id, clothid, textid) => {
    mp.events.callRemote("Preview_Clothes", id, clothid, textid);
});


mp.events.add('Buy_Clothes', (id,clothid,textid,price) => {
    mp.events.callRemote("Buy_Clothes", id, clothid, textid,price);
});

mp.events.add('Display_Cloth_Selector', (data) => {
    if (uiGlobal_Browsers != undefined) {
        uiGlobal_Browsers.destroy();
    }
    setTimeout(function () {
        uiGlobal_Browsers = mp.browsers.new("package://files/kiyafet-sistem/select_switchers.html");
        uiGlobal_Browsers.execute("LoadList('" + data + "');");
        mp.gui.cursor.visible = true;
    }, 300);
});

mp.events.add('ShowMainClothMenu', () => {
    if (uiGlobal_Browsers === undefined) {
        uiGlobal_Browsers = mp.browsers.new("package://files/kiyafet-sistem/Main.html");
    }

    mp.gui.cursor.visible = true;
});

mp.events.add('destroyBrowser', () => {

    mp.gui.cursor.visible = false;

    if (customBrowser != undefined) {
        customBrowser.destroy();
        customBrowser = undefined;
    }
});



//
//
//

let policeMainDoors = undefined;
let policeBackDoors = undefined;
let policeCellDoors = undefined;
let hospitalinterior = undefined;
let motorsportMain = undefined;
let motorsportParking = undefined;
let supermarketDoors = undefined;
let clubhouseDoor = undefined;
let oficina_portao = undefined;
let oficina_porta = undefined;

mp.events.add('guiReady', () => {


    hospitalinterior = mp.colshapes.newSphere(-458.7,-363.6,-186.4, 50.0);
    policeMainDoors = mp.colshapes.newSphere(468.535, -1014.098, 26.386, 5.0);
    policeBackDoors = mp.colshapes.newSphere(435.131, -981.9197, 30.689, 5.0);
    motorsportMain = mp.colshapes.newSphere(-59.893, -1092.952, 26.8836, 5.0);
    motorsportParking = mp.colshapes.newSphere(-39.134, -1108.22, 26.72, 5.0);
    supermarketDoors = mp.colshapes.newSphere(-711.545, -915.54, 19.216, 5.0);
    oficina_portao = mp.colshapes.newSphere(484.5166, -1315.502, 29.20002, 10.0);
    oficina_porta = mp.colshapes.newSphere(482.911, -1312.584, 29.20103, 10.0);
});

mp.events.add('playerWeaponShot', (targetPosition, targetEntity) => {
  let weaponHash = mp.players.local.weapon;
  let shakeType = 'SMALL_EXPLOSION_SHAKE';
  let shakeIntensity = 0.02;

  switch(weaponHash) {
    case mp.game.joaat('WEAPON_PISTOL'):
      shakeType = 'SMALL_EXPLOSION_SHAKE';
      shakeIntensity = 0.02;
      break;
    case mp.game.joaat('WEAPON_COMBATPISTOL'):
        shakeType = 'SMALL_EXPLOSION_SHAKE';
        shakeIntensity = 0.02;
        break;
    case mp.game.joaat('WEAPON_HEAVYPISTOL'):
        shakeType = 'SMALL_EXPLOSION_SHAKE';
        shakeIntensity = 0.03;
        break;
    case mp.game.joaat('WEAPON_SNSPISTOL'):
      shakeType = 'SMALL_EXPLOSION_SHAKE';
      shakeIntensity = 0.02;
      break;
    case mp.game.joaat('WEAPON_SMG'):
        shakeType = 'SMALL_EXPLOSION_SHAKE';
        shakeIntensity = 0.03;
        break;
    case mp.game.joaat('WEAPON_ASSAULTSMG'):
        shakeType = 'SMALL_EXPLOSION_SHAKE';
        shakeIntensity = 0.03;
        break;
    case mp.game.joaat('WEAPON_MINISMG'):
        shakeType = 'SMALL_EXPLOSION_SHAKE';
        shakeIntensity = 0.02;
        break;
    case mp.game.joaat('WEAPON_CARBINERIFLE'):
        shakeType = 'SMALL_EXPLOSION_SHAKE';
        shakeIntensity = 0.04;
        break;
    case mp.game.joaat('WEAPON_ASSAULTRIFLE'):
        shakeType = 'SMALL_EXPLOSION_SHAKE';
        shakeIntensity = 0.05;
        break;
    case mp.game.joaat('WEAPON_COMBATPDW'):
        shakeType = 'SMALL_EXPLOSION_SHAKE';
        shakeIntensity = 0.04;
        break;
    case mp.game.joaat('WEAPON_ADVANCEDRIFLE'):
        shakeType = 'SMALL_EXPLOSION_SHAKE';
        shakeIntensity = 0.05;
        break;
    case mp.game.joaat('WEAPON_SPECIALCARBINE'):
        shakeType = 'SMALL_EXPLOSION_SHAKE';
        shakeIntensity = 0.04;
        break;
    case mp.game.joaat('WEAPON_COMPACTRIFLE'):
        shakeType = 'SMALL_EXPLOSION_SHAKE';
        shakeIntensity = 0.04;
        break;
    case mp.game.joaat('WEAPON_PUMPSHOTGUN_MK2'):
        shakeType = 'SMALL_EXPLOSION_SHAKE';
        shakeIntensity = 0.07;
        break;
    case mp.game.joaat('WEAPON_PUMPSHOTGUN'):
      shakeType = 'SMALL_EXPLOSION_SHAKE';
      shakeIntensity = 0.08;
      break;
  }

  mp.game.cam.shakeGameplayCam(shakeType, shakeIntensity);
});


  

mp.events.add('playerEnterColshape', (shape) => {


    switch (shape) {
       
        case policeMainDoors:
            mp.game.object.doorControl(mp.game.joaat('v_ilev_ph_door002'), 434.7479, -983.2151, 30.83926, false, 0.0, 50.0, 0);
            mp.game.object.doorControl(mp.game.joaat('v_ilev_ph_door01'), 434.7479, -980.6184, 30.83926, false, 0.0, 50.0, 0);
            break;
        case policeBackDoors:
            mp.game.object.doorControl(mp.game.joaat('v_ilev_rc_door2'), 469.9679, -1014.452, 26.53623, false, 0.0, 50.0, 0);
            mp.game.object.doorControl(mp.game.joaat('v_ilev_rc_door2'), 467.3716, -1014.452, 26.53623, false, 0.0, 50.0, 0);
            break;
        case policeCellDoors:
            mp.game.object.doorControl(mp.game.joaat('v_ilev_ph_cellgate'), 461.8065, -994.4086, 25.06443, false, 0.0, 50.0, 0);
            mp.game.object.doorControl(mp.game.joaat('v_ilev_ph_cellgate'), 461.8065, -997.6583, 25.06443, false, 0.0, 50.0, 0);
            mp.game.object.doorControl(mp.game.joaat('v_ilev_ph_cellgate'), 461.8065, -1001.302, 25.06443, false, 0.0, 50.0, 0);
            break;
        case motorsportMain:
            mp.game.object.doorControl(mp.game.joaat('v_ilev_csr_door_l'), -59.89302, -1092.952, 26.88362, false, 0.0, 50.0, 0);
            mp.game.object.doorControl(mp.game.joaat('v_ilev_csr_door_r'), -60.54582, -1094.749, 26.88872, false, 0.0, 50.0, 0);
            break;
        case supermarketDoors:
            mp.game.object.doorControl(mp.game.joaat('v_ilev_gasdoor'), -711.5449, -915.5397, 19.21559, false, 0.0, 50.0, 0);
            mp.game.object.doorControl(mp.game.joaat('v_ilev_gasdoor_r'),-711.5449, -915.5397, 19.2156, false, 0.0, 50.0, 0);
            break;
        case oficina_portao:
            mp.game.object.doorControl(mp.game.joaat('prop_com_gar_door_01'), 484.5166, -1315.502, 29.20002, false, 0.0, 50.0, 0);
            break;
        case oficina_porta:
            mp.game.object.doorControl(mp.game.joaat('v_ilev_cs_door'), 482.911, -1312.584, 29.20103, false, 0.0, 50.0, 0);
            break;
    }
});

mp.events.add('doorLock', (model, position, locked) => {

    try {
        mp.game.object.doorControl(parseInt(model), position.x, position.y, position.z, locked, 1.0, 0.1, 0.0) 


    }
    catch (e) {
        mp.gui.chat.push(model + " " + position.toString() + " " + locked);
    }
    // mp.game.object.setStateOfClosestDoorOfType(model, position.x, position.y, position.z, locked, 0, false);
});

mp.events.add('explode', (position, explosionType, damageScale, isAudible, isInvisible, cameraShake) => {
    mp.game.fire.addExplosion(position.x, position.y, position.z, explosionType, damageScale, isAudible, isInvisible, cameraShake);
});

//
// Login
//
var loginCamera = camerasManager.createCamera('loginCamera', 'default', new mp.Vector3(-436.0717, 1039.26, 372.1287), new mp.Vector3(3.063985, 0.0, -170.8151), 60);


mp.events.add('accountLoginForm', (bool) => {

    if (bool == null) {
        mp.events.call('createBrowser', ['package://files/karakter-sistem/login.html']);

        mp.gui.chat.activate(false);
        mp.gui.chat.safeMode = false;
        mp.gui.chat.colors = true;
        mp.game.graphics.startScreenEffect('SwitchSceneMichael', 5000, false);


        camerasManager.setActiveCamera(loginCamera, true);
        camerasManager.setActiveCameraWithInterp(loginCamera, new mp.Vector3(-508.6306, -267.414, 63.64975), new mp.Vector3(-14, 0, 32), 10000, 0, 0)

        mp.game.ui.displayRadar(false);
        mp.game.gameplay.enableMpDlcMaps(true);
        mp.game.player.disableVehicleRewards();
    }
    else {
        mp.gui.chat.activate(false);
        mp.gui.chat.safeMode = false;
        mp.gui.chat.colors = true;

        mp.game.ui.displayRadar(false);
        mp.game.gameplay.enableMpDlcMaps(true);
        mp.game.player.disableVehicleRewards();
    }
});


mp.events.add('loginUser', (login_password) => {

    setTimeout(function() {
        mp.events.callRemote('loginUser', login_password);
    }, 100);
});

mp.events.add('Recovery_Password', (recinfo) => {

    setTimeout(function () {
        mp.events.callRemote('Recovery_Password', recinfo);
    }, 100);
});

mp.events.add('registerUser', (register_password, register_email,ref) => {

    setTimeout(function() {
        mp.events.callRemote('registerUser', register_password, register_email, ref);
    }, 100);
});

mp.events.add('clearLoginWindow', () => {
    mp.players.local.freezePosition(false);

    mp.events.call('destroyBrowser');

    mp.game.graphics.stopScreenEffect('SwitchSceneMichael');
});

mp.events.add('displayerror', (id,text) => {
    if (customBrowser != undefined) {
        switch (id) {
            case 0:
                customBrowser.execute("displayerror0();");
                break;
            case 1:
                customBrowser.execute("displayerror1(" + text+");");
                break;
            case 2:
                customBrowser.execute("displayerror2();");
                break;
            default:
        }
        
    }
});

let spyCamera = mp.cameras.new('default', new mp.Vector3(0.0, 0.0, 0.0), new mp.Vector3(0.0, 0.0, 0.0), 0);

findPlayerByIdOrNickname = function(playerName) {
    let foundPlayer = null;
    if (playerName == parseInt(playerName)) {
        foundPlayer = mp.players.at(playerName);
    }

    if (!foundPlayer) {
        mp.players.forEach((_player) => {
            if (_player.name === playerName) {
                foundPlayer = _player;
            }
        });
    }
    return foundPlayer;
}

let driverLicenseCamera = camerasManager.createCamera('driverLicenseCamera', 'default', new mp.Vector3(-878.0559, -2081.562, 23.799), new mp.Vector3(-14, 0, 46), 50);

mp.events.add('ShowDMVCamera', (type) => {
    if (type === 1) {
        camerasManager.destroyCamera(driverLicenseCamera);
        driverLicenseCamera = camerasManager.createCamera('driverLicenseCamera', 'default', new mp.Vector3(-878.0559, -2081.562, 23.799), new mp.Vector3(-14, 0, 46), 50);
        camerasManager.setActiveCamera(driverLicenseCamera, true);
        camerasManager.setActiveCameraWithInterp(driverLicenseCamera, new mp.Vector3(-878.0559, -2081.562, 23.799), new mp.Vector3(-14, 0, 46), 30000, 0, 0);
    } else if (type === 2) {
        camerasManager.destroyCamera(driverLicenseCamera);
        driverLicenseCamera = camerasManager.createCamera('driverLicenseCamera', 'default', new mp.Vector3(79.85892, -1369.071, 37.84154), new mp.Vector3(-10, 0, 88), 50);
        camerasManager.setActiveCamera(driverLicenseCamera, true);
        camerasManager.setActiveCameraWithInterp(driverLicenseCamera, new mp.Vector3(79.85892, -1369.071, 37.84154), new mp.Vector3(-10, 0, 88), 30000, 0, 0);
    } else if (type === 3) {
        camerasManager.destroyCamera(driverLicenseCamera);
        driverLicenseCamera = camerasManager.createCamera('driverLicenseCamera', 'default', new mp.Vector3(-99.26994, -1178.103, 31.79146), new mp.Vector3(-12, 0, -8), 50);
        camerasManager.setActiveCamera(driverLicenseCamera, true);
        camerasManager.setActiveCameraWithInterp(driverLicenseCamera, new mp.Vector3(-99.26994, -1178.103, 31.79146), new mp.Vector3(-12, 0, -8), 30000, 0, 0);
    } else if (type === 4) {
        camerasManager.destroyCamera(driverLicenseCamera);
        driverLicenseCamera = camerasManager.createCamera('driverLicenseCamera', 'default', new mp.Vector3(95.80418, -1043.833, 40.31485), new mp.Vector3(-34, 0, -20), 50);
        camerasManager.setActiveCamera(driverLicenseCamera, true);
        camerasManager.setActiveCameraWithInterp(driverLicenseCamera, new mp.Vector3(95.80418, -1043.833, 40.31485), new mp.Vector3(-34, 0, -20), 30000, 0, 0);
    } else if (type === 5) {
        camerasManager.destroyCamera(driverLicenseCamera);
        driverLicenseCamera = camerasManager.createCamera('driverLicenseCamera', 'default', new mp.Vector3(396.9243, -989.0579, 33.46381), new mp.Vector3(-12, 0, -90), 50);
        camerasManager.setActiveCamera(driverLicenseCamera, true);
        camerasManager.setActiveCameraWithInterp(driverLicenseCamera, new mp.Vector3(396.9243, -989.0579, 33.46381), new mp.Vector3(-12, 0, -90), 30000, 0, 0);
    } else if (type === 6) {
        camerasManager.destroyCamera(driverLicenseCamera);
        driverLicenseCamera = camerasManager.createCamera('driverLicenseCamera', 'default', new mp.Vector3(2767.7, 3917.981, 69.10294), new mp.Vector3(-10, 0, 34), 50);
        camerasManager.setActiveCamera(driverLicenseCamera, true);
        camerasManager.setActiveCameraWithInterp(driverLicenseCamera, new mp.Vector3(2767.7, 3917.981, 69.10294), new mp.Vector3(-10, 0, 34), 30000, 0, 0);
    } else if (type === 7) {
        camerasManager.destroyCamera(driverLicenseCamera);
        camerasManager.setActiveCamera(driverLicenseCamera, false);
        mp.game.cam.renderScriptCams(false, false, 0, true, false);
    }
});


mp.events.add("PlaySoundFrontend", (audioName, audioLibrary) => {
    mp.game.audio.playSoundFrontend(-1, audioName, audioLibrary, true);
});

function ringtone(clientID, stop = false) {
    if (ringTone != null) clearInterval(ringTone);
    if (stop) return false;

    ringToneCounter = 0;

    ringTone = setInterval(function() {
        ringToneCounter++;

        if (ringToneCounter < 11) {
            mp.events.call('playSoundFor', clientID, 'On_Call_Player_Join', 'DLC_HEISTS_GENERAL_FRONTEND_SOUNDS');
        }

        if (ringToneCounter > 30) ringToneCounter = 0;
    }, 78);
}

mp.events.add({

    "playClientSound": (soundName, volume) => {
        if (uiPlayer_Browsers != undefined) {
            volume = Math.round(volume * 10) / 10;

            uiPlayer_Browsers.execute(`playAudio('${soundName}', '${volume}');`);
        }
    },
    "StopClientSound": () => {
        if (uiPlayer_Browsers != undefined) {

            uiPlayer_Browsers.execute(`stopaudio();`);
        }
    },
});

const Natives2 = {
    SWITCH_OUT_PLAYER: '0xAAB3200ED59016BC',
    SWITCH_IN_PLAYER: '0xD8295AF639FD9CB8',
    IS_PLAYER_SWITCH_IN_PROGRESS: '0xD9D2CFFF49FAB35F'
};
let gui;
        
mp.events.add('moveSkyCamera', moveFromToAir);

function moveFromToAir(player, moveTo, switchType, showGui) {   
    
     /*   switchType: 0 - 3

        0: 1 step towards ped
        1: 3 steps out from ped (Recommended)
        2: 1 step out from ped
        3: 1 step towards ped*/
   
   switch (moveTo) {
       case 'up':
            if (showGui == false) {
                mp.gui.chat.show(showGui);
                gui = 'false';
            };
            mp.game.invoke(Natives2.SWITCH_OUT_PLAYER, player.handle, 0, parseInt(switchType));
           break;
       case 'down':
            if (gui == 'false') {
                checkCamInAir();
            };
            mp.game.invoke(Natives2.SWITCH_IN_PLAYER, player.handle);
           break;
   
       default:
           break;
   }
}

function checkCamInAir() {
    if (mp.game.invoke(Natives2.IS_PLAYER_SWITCH_IN_PROGRESS)) {
        setTimeout(() => {
            checkCamInAir();
        }, 400);
    } else {
        mp.gui.chat.show(true);
        gui = 'true';
    }
}


mp.events.add("SetWalkStyle", (player, walkstyle) => {
    
    player.resetStrafeClipset();
    player.resetMovementClipset(0.5);
    //mp.game.streaming.requestClipSet(walkstyle);
    player.setMovementClipset(walkstyle, 0.5);
    if (walkstyle == "move_ped_crouched") {
       // mp.game.streaming.requestClipSet("move_ped_crouched_strafing");
        player.setStrafeClipset("move_ped_crouched_strafing");
    }
});
var lastpos;

mp.events.addDataHandler("Injured", (entity, value) => {
    if (value == 1 && entity == localPlayer) {
        lastpos = localPlayer.position.z.toFixed(1);
        var git = setInterval(function () {
            if (localPlayer.getVariable('Injured') != 1) {
                clearInterval(git);
            }
            if (localPlayer.position.z.toFixed(1) == lastpos) {
                mp.events.callRemote("SetFullyInjured");
                clearInterval(git);
            }
            else {
                lastpos = localPlayer.position.z.toFixed(1);
            }
        }, 2000);
    }
    else if (value == 2 || value == 0) {
                
    }
   
});


mp.events.add("ForeachFreezeVeh", (vehicle,stats) => {
if (vehicle != undefined)
{
    vehicle.freezePosition(stats);

}
});

mp.events.addDataHandler("isadmininvicible", (entity, value, oldValue) => {
    entity.setInvincible(value);
});

mp.events.addDataHandler("Invicible_Admin", (entity, value) => {
    entity.setInvincible(value);
});


mp.events.add('syncHorn', (vehicle, playing, sound, id) => {
    if (!playing) {
        mp.game.invoke('0xA3B0C41BA5CC0BB5', id)
    } else {
        mp.game.audio.playSoundFromEntity(id, sound, vehicle.handle, '', true, 0)
    }
})


mp.events.addDataHandler("SirenLight", (entity, value) => {
    if (entity.type === "vehicle") {
        entity.setSiren(!value);
    }
    
});

mp.events.addDataHandler("SirenSound", (entity, value) => {
    if (entity.type === "vehicle") {
        entity.setSirenSound(!value);
    }
    
});



mp.events.add("entityStreamIn", (entity) => {
    if (entity.type === "player")
    {
        if (entity.getVariable("walkstyle") != null) {
            entity.setMovementClipset(entity.getVariable("walkstyle"), 0)
        }
    }
    if(entity.type === "vehicle")
    {
           
        if (entity.getVariable("VehFreezed") == true) {
            entity.freezePosition(true)
        }
        if (entity.getClass == 18) {
            if (entity.getVariable("SirenLight") == true) {
                entity.setSiren(true)
            } else if (entity.getVariable("SirenLight") == false) {
                entity.setSiren(false)
            }

            if (entity.getVariable("SirenSound") == true) {
                entity.setSirenSound(false)
            } else if (entity.getVariable("SirenSound") == false){
                entity.setSirenSound(true)
            }
        }
            
    }
});

// C key 
mp.keys.bind(0x43, false, () => {
    if (logged === 0 || chatopened || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;
    mp.events.callRemote("toggleCrouch");
});



////f g
mp.events.add('pressgkey', () => {
    const localPlayer = mp.players.local;
    if (localPlayer.vehicle === null) {
        let found = false;

        mp.vehicles.forEachInStreamRange((vehicle) => {
            const dist = distanceTo(localPlayer.position, vehicle.position);
            if (!found && (localPlayer.isOnSpecificVehicle(vehicle.handle) || dist < 4 && vehicle.getSpeed() < 5 && localPlayer.getVariable("Injured") == 0)) {
                found = true;
                let seat_pside_r = vehicle.getWorldPositionOfBone(vehicle.getBoneIndexByName("seat_pside_r"));
                let seat_pside_f = vehicle.getWorldPositionOfBone(vehicle.getBoneIndexByName("seat_pside_f"));
                let seat_dside_r = vehicle.getWorldPositionOfBone(vehicle.getBoneIndexByName("seat_dside_r"));
                let door_pside_r = vehicle.getWorldPositionOfBone(vehicle.getBoneIndexByName("door_pside_r"));
                let seat_r = vehicle.getWorldPositionOfBone(vehicle.getBoneIndexByName("seat_r"));
                let playerPos = mp.players.local.position;
                let distance = calcDist(playerPos, seat_pside_r);
                let seat = 0;

                if (vehicle.isSeatFree(0) && calcDist(playerPos, seat_pside_f) < distance) {
                    distance = calcDist(playerPos, seat_pside_f);
                    seat = 0;
                }
                if (vehicle.isSeatFree(1) && calcDist(playerPos, seat_dside_r) < distance) {
                    distance = calcDist(playerPos, seat_dside_r);
                    seat = 1;
                }
                if (vehicle.isSeatFree(2) && calcDist(playerPos, door_pside_r) < distance) {
                    distance = calcDist(playerPos, seat_dside_r);
                    seat = 2;
                }
                if (vehicle.isSeatFree(3) && calcDist(playerPos, seat_r) < distance) {
                    seat = 3;

                } if (vehicle.isSeatFree(4) && calcDist(playerPos, seat_r) < distance) {
                    seat = 4;
                }
                
                if (vehicle.model == 0x1517D4D9) {
                    if (vehicle.isSeatFree(2) && calcDist(playerPos, seat_pside_r) < calcDist(playerPos, seat_pside_f)  ) {
                        seat = 2;
                    }
                }
                if (vehicle.isSeatFree(seat)) {
                    localPlayer.taskEnterVehicle(vehicle.handle, 5000, seat, 2.0, 1, 0);
                   // mp.gui.chat.push(calcDist(playerPos, seat_pside_f) + " " + seat);
                    return;
                }

            }

        });
    }
});

mp.events.add('UpdateAutoPilotSpeed', (speed) => {
    autoPilotSpeed = speed;
});

mp.events.add('updateautopilotbehavior', (behave) => {
    autoPilotBehavior = behave;
});

mp.events.addDataHandler("PlayAnimationwithtime", (entity, value) => {
    if (entity.type === "player") {
        mp.game.streaming.requestAnimDict(value[0].animdictionary);

        entity.taskPlayAnim(value[0].animdictionary, value[0].animationName, value[0].Blendinspeed, value[0].blendoutspeed, value[0].duration, value[0].flag, 0, false, false, false);
    }
});

var autopilotStart = !1,
    autopilotPoint = null,
    autopilotInterval = null;
let autoPilotSpeed = 35;
let autoPilotBehavior = 2883621;

mp.events.add('autopilotvip', () => {
    if (logged === 0 || chatopened || uiGlobal_Browsers != undefined || uiGeneralStart_Browsers != undefined || menu_libary === true || new Date().getTime() - lastCheck < 100) return;
    lastCheck = new Date().getTime();
    const a = localplayer.vehicle;
    if (localplayer.vehicle.getPedInSeat(-1) !== localplayer.handle) return;
    if (autopilotStart) {
        const a = localplayer.vehicle;
        return a && (localplayer.clearTasks(), localplayer.taskVehicleTempAction(a.handle, 27, 1e4)), autopilotPoint = null, autopilotStart = !1, void clearInterval(autopilotInterval)
    }
    if (null == a) return;

    //  var vehicleName = a.getModel();
    //  mp.gui.chat.push(`vehname: ${vehicleName}`);

    //   var engine = a.getIsEngineRunning();
    // if (engine == false) return mp.game.graphics.notify('Turn On The Engine.');  

    let b = mp.game.invoke("0x1DD1F58F493F1DA5"),
        c = mp.game.invoke("0x186E5D252FA50E7D"),
        d = mp.game.invoke("0x1BEDE233E6CD2A1F", c),
        e = mp.game.invoke("0x14F96AA50D6FBEA7", c);

    for (let a = d; 0 != mp.game.invoke("0xA6DB27D19ECBB7DA", a); a = e)
        if (4 == mp.game.invoke("0xBE9B0959FFD0779B", a) && !!b) {
            autopilotPoint = mp.game.ui.getBlipInfoIdCoord(a);
            break
        }
    return null == autopilotPoint ? void mp.game.graphics.notify("OTOPILOT: Haritada bir yer işaretlemelisiniz.") : void (!autopilotStart && (mp.game.graphics.notify("OTOPILOT: Yer işaretlendi. Otopilot etkinleştirildi!"), localplayer.taskVehicleDriveToCoord(a.handle, autopilotPoint.x, autopilotPoint.y, autopilotPoint.z, autoPilotSpeed, 1, 1, autoPilotBehavior, 30, 1), autopilotStart = !0, clearInterval(autopilotInterval), autopilotInterval = setInterval(() => {
        if (!autopilotStart) return void clearInterval(autopilotInterval);
        const a = localplayer.vehicle;
        return a ? 15 > mp.game.system.vdist(localplayer.position.x, localplayer.position.y, localplayer.position.z, autopilotPoint.x, autopilotPoint.y, autopilotPoint.z) ? (localplayer.clearTasks(), a && localplayer.taskVehicleTempAction(a.handle, 27, 1e4), autopilotPoint = null, autopilotStart = !1, clearInterval(autopilotInterval), void mp.game.graphics.notify("OTOPILOT: İşaretlediğiniz noktaya ulaştınız!")) : void 0 : (a && (localplayer.clearTasks(), localplayer.taskVehicleTempAction(a.handle, 27, 1e4)), autopilotStart = !1, void clearInterval(autopilotInterval))
    }, 300)))
});

function distanceTo(vec1, vec2) {
    return Math.hypot(vec2.x - vec1.x, vec2.y - vec1.y, vec2.z - vec1.z);
}

mp.events.add('radiooff', (vehicle, seat) => {
    setTimeout(() => {
        mp.game.audio.setRadioToStationName("OFF");
    }, 1000);
});

let lastWaypoint = null;

function getWaypointCoords() {
    const blip = mp.game.ui.getFirstBlipInfoId(8);
    if (mp.game.ui.doesBlipExist(blip)) {
        return mp.game.ui.getBlipInfoIdCoord(blip);
    }
    return null;
}

setInterval(() => {
    if (!mp.players.local.isInAnyVehicle(false)) return;

    const wp = getWaypointCoords();

    if (wp && (!lastWaypoint || wp.x !== lastWaypoint.x || wp.y !== lastWaypoint.y)) {
        lastWaypoint = wp;
        mp.events.callRemote('WaypointUpdated', wp.x, wp.y);
    }
}, 1000);

mp.events.add('SetWaypoint', (x, y) => {
    mp.game.ui.setNewWaypoint(x, y);
});

let ehliyetBrowser = null;

mp.events.add('client:EhliyetOnay', () => {
    if (ehliyetBrowser === null)
    {
        mp.gui.cursor.visible = true;

        ehliyetBrowser = mp.browsers.new('package://files/ehliyet-sistem/index.html');        
        ehliyetBrowser.execute(`showSinavDialog();`);
    }
    else return;
});

mp.events.add('client:EhliyetKapat', () => {
    if (ehliyetBrowser !== null)
    {
        mp.gui.cursor.visible = false;
        ehliyetBrowser.destroy();
        ehliyetBrowser = null;
    }
    else return;
});

mp.events.add('client:EhliyetSecildi', (status, secilen = 0) => {
    if (status === true) mp.events.callRemote("server:EhliyetSecildi", status, secilen);
    else if (status === false) mp.events.callRemote("server:EhliyetSecildi", status, secilen);
    else return;
});

/////////////////////////////////////////////////////////////////////////////////////////////////////

let parcalamaBrowser = null;

mp.events.add('client:ParcalamaOnay', (model) => {
    if (parcalamaBrowser === null)
    {
        mp.gui.cursor.visible = true;

        parcalamaBrowser = mp.browsers.new('package://files/aracparcalama-sistem/index.html');        
        parcalamaBrowser.execute(`showParcalamaDialog('${model}');`);
    }
    else return;
});

mp.events.add('client:ParcalamaKapat', () => {
    if (parcalamaBrowser !== null)
    {
        mp.gui.cursor.visible = false;
        parcalamaBrowser.destroy();
        parcalamaBrowser = null;
    }
    else return;
});

mp.events.add('client:ParcalamaSecildi', (status) => {
    if (status === true) mp.events.callRemote("server:ParcalamaSecildi", status);
    else if (status === false) mp.events.callRemote("server:ParcalamaSecildi", status);
    else return;
});

/////////////////////////////////////////////////////////////////////////////////////////////////////

let radyoBrowser = null;

mp.events.add('client:RadyoSecimi', () => {
    if (radyoBrowser === null)
    {
        mp.gui.cursor.visible = true;

        radyoBrowser = mp.browsers.new('package://files/boombox-sistem/index.html');        
        radyoBrowser.execute(`showRadyoDialog();`);
    }
    else return;
});

mp.events.add('client:RadyoKapat', () => {
    if (radyoBrowser !== null)
    {
        mp.gui.cursor.visible = false;
        radyoBrowser.destroy();
        radyoBrowser = null;
    }
    else return;
});

mp.events.add('client:RadyoSecildi', (status, secilen = 0) => {
    mp.events.callRemote("server:RadyoSecildi", status, secilen);
});

mp.events.add('client:RadyoOzelURL', () => {
    if (radyoBrowser === null)
    {
        mp.gui.cursor.visible = true;

        radyoBrowser = mp.browsers.new('package://files/boombox-sistem/url.html');        
        radyoBrowser.execute(`showURLDialog();`);
    }
    else
    {
        radyoBrowser.destroy();
        radyoBrowser = null;

        mp.gui.cursor.visible = true;

        radyoBrowser = mp.browsers.new('package://files/boombox-sistem/url.html');        
        radyoBrowser.execute(`showURLDialog();`);
    }
});

mp.events.add('client:OzelURL', (status, url) => {
    mp.events.callRemote("server:OzelURLGirildi", status, url);
});

class TelefonSistemi {
    constructor() {
        this.browsers = {
            anaEkran: null,
            numara: null,
            mesaj: null,
            mesaj2: null,
            kartvizitler: null,
            kartvizitIslem: null,
            kartvizitIslem2: null,
            kartvizitIslem3: null,
            kartvizitIslem4: null,
            kartvizitSil: null,
            kartvizitEkle: null,
            kartvizitEkle2: null
        };
        
        this.initializeEvents();
    }

    isAnyBrowserActive(excludeBrowser = null) {
        return Object.entries(this.browsers).some(([key, browser]) => 
            key !== excludeBrowser && browser !== null
        );
    }

    updateTarayiciAcikmi() {
        const anyBrowserOpen = Object.values(this.browsers).some(browser => browser !== null);
        TarayiciAcikmi = anyBrowserOpen;
        mp.events.call("updateTarayiciStatus", anyBrowserOpen);
    }

    setCursorVisible(visible) {
        mp.gui.cursor.visible = visible;
    }

    toggleBrowser(browserName, htmlFile, executeCommand = null) {
        if (this.isAnyBrowserActive(browserName)) return;

        if (this.browsers[browserName] === null) {
            this.browsers[browserName] = mp.browsers.new(`package://files/telefon-sistem/${htmlFile}`);
            if (executeCommand) {
                this.browsers[browserName].execute(executeCommand);
            }
            this.setCursorVisible(true);
            this.updateTarayiciAcikmi();
        } else {
            this.closeBrowser(browserName);
        }
    }

    closeBrowser(browserName) {
        if (this.browsers[browserName] !== null) {
            this.browsers[browserName].destroy();
            this.browsers[browserName] = null;
            this.setCursorVisible(false);
            this.updateTarayiciAcikmi();
        }
    }

    callServerEvent(eventName, browserName, ...args) {
        if (this.isAnyBrowserActive(browserName)) return;
        if (this.browsers[browserName] === null) return;
        mp.events.callRemote(eventName, ...args);
    }

    initializeEvents() {
        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        mp.events.add('client:TelefonAc', (number) => {
            this.toggleBrowser('anaEkran', 'ana-ekran.html', `showTelefonDialog(${number})`);
        });

        mp.events.add('client:AnaMenuKapat', () => {
            this.closeBrowser('anaEkran');
        });

        mp.events.add('client:AnaMenuIslem', (status, islem) => {
            this.callServerEvent("server:AnaMenuIslem", 'anaEkran', status, islem);
        });
        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        mp.events.add('client:NumaraCevir', () => {
            this.toggleBrowser('numara', 'numara-cevir.html', 'showAramaDialog()');
        });

        mp.events.add('client:NumaraCevirKapat', () => {
            this.closeBrowser('numara');
        });

        mp.events.add('client:NumaraCevirildi', (status, numara) => {
            this.callServerEvent("server:NumaraCevirildi", 'numara', status, numara);
        });
        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        mp.events.add('client:KisaMesaj', () => {
            this.toggleBrowser('mesaj', 'kisa-mesaj.html', 'showKisaMesajDialog()');
        });

        mp.events.add('client:KisaMesajKapat', () => {
            this.closeBrowser('mesaj');
        });

        mp.events.add('client:KisaMesajBirinci', (status, numara) => {
            this.callServerEvent("server:KisaMesajBirinci", 'mesaj', status, numara);
        });
        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        mp.events.add('client:KisaMesajIki', (number) => {
            this.toggleBrowser('mesaj2', 'kisa-mesaj-iki.html', `showKisaMesajDialog(${number})`);
        });

        mp.events.add('client:KisaMesajIkiKapat', () => {
            this.closeBrowser('mesaj2');
        });

        mp.events.add('client:KisaMesajIkinci', (status, numara) => {
            this.callServerEvent("server:KisaMesajIkinci", 'mesaj2', status, numara);
        });
        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        mp.events.add('client:RehberYukle', (json) => {
            this.toggleBrowser('kartvizitler', 'kartvizitler.html', `showTelefonDialog(${json})`);
        });

        mp.events.add('client:RehberKapat', () => {
            this.closeBrowser('kartvizitler');
        });

        mp.events.add('client:RehberSecildi', (status, numara) => {
            this.callServerEvent("server:RehberSecildi", 'kartvizitler', status, numara);
        });
        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        mp.events.add('client:KartvizitEkle', () => {
            this.toggleBrowser('kartvizitEkle', 'kartvizit-ekle.html', `showKartvizitEkleDialog()`);
        });

        mp.events.add('client:KartvizitEkleKapat', () => {
            this.closeBrowser('kartvizitEkle');
        });

         mp.events.add('client:KartvizitEklendi', (status, numara) => {
            this.callServerEvent("server:KartvizitEklendi", 'kartvizitEkle', status, numara);
        });
        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        mp.events.add('client:KartvizitEkleIki', () => {
            this.toggleBrowser('kartvizitEkle2', 'kartvizit-ekle-iki.html', `showKartvizitEkleDialog()`);
        });

        mp.events.add('client:KartvizitEkleIkiKapat', () => {
            this.closeBrowser('kartvizitEkle2');
        });

         mp.events.add('client:KartvizitEkleIkiEklendi', (status, numara) => {
            this.callServerEvent("server:KartvizitEkleIkiEklendi", 'kartvizitEkle2', status, numara);
        });
        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        mp.events.add('client:KartvizitIslem', (isim, numara) => {
            this.toggleBrowser('kartvizitIslem', 'kartvizit-islem.html', `showKartvizitDuzenle("${isim}", ${numara})`);
        });

        mp.events.add('client:KartvizitIslemKapat', () => {
            this.closeBrowser('kartvizitIslem');
        });

         mp.events.add('client:KartvizitIslemYapildi', (status, islem) => {
            this.callServerEvent("server:KartvizitIslemYapildi", 'kartvizitIslem', status, islem);
        });
        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        mp.events.add('client:KartvizitIkiIslem', (isim, numara) => {
            this.toggleBrowser('kartvizitIslem2', 'kartvizit-islem-iki.html', `showKartvizitDuzenle("${isim}", ${numara})`);
        });

        mp.events.add('client:KartvizitIslemIkiKapat', () => {
            this.closeBrowser('kartvizitIslem2');
        });

         mp.events.add('client:KartvizitIkiIslemYapildi', (status, islem) => {
            this.callServerEvent("server:KartvizitIkiIslemYapildi", 'kartvizitIslem2', status, islem);
        });
        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        mp.events.add('client:NumaraDuzenle', (isim, numara) => {
            this.toggleBrowser('kartvizitIslem3', 'kartvizit-islem-uc.html', `showKartvizitDuzenle("${isim}", ${numara})`);
        });

        mp.events.add('client:NumaraDuzenleKapat', () => {
            this.closeBrowser('kartvizitIslem3');
        });

         mp.events.add('client:NumaraDuzenlendi', (status, yenino) => {
            this.callServerEvent("server:NumaraDuzenlendi", 'kartvizitIslem3', status, yenino);
        });
        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        mp.events.add('client:IsimDuzenle', (isim, numara) => {
            this.toggleBrowser('kartvizitIslem4', 'kartvizit-islem-dort.html', `showKartvizitDuzenle("${isim}", ${numara})`);
        });

        mp.events.add('client:IsimDuzenleKapat', () => {
            this.closeBrowser('kartvizitIslem4');
        });

         mp.events.add('client:IsimDuzenlendi', (status, yenino) => {
            this.callServerEvent("server:IsimDuzenlendi", 'kartvizitIslem4', status, yenino);
        });
        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        mp.events.add('client:KartvizitSil', (isim, numara) => {
            this.toggleBrowser('kartvizitSil', 'kartvizit-sil.html', `showKartvizitSil("${isim}", ${numara})`);
        });

        mp.events.add('client:KartvizitSilKapat', () => {
            this.closeBrowser('kartvizitSil');
        });

         mp.events.add('client:KartvizitSilOnay', (status) => {
            this.callServerEvent("server:KartvizitSilOnay", 'kartvizitSil', status);
        });
    }
}
const telefonSistemi = new TelefonSistemi();

let balikBrowser = null;

mp.events.add('client:BalikBrowser', () => {
    if (balikBrowser === null)
    {
        mp.events.call("updateBalikStatus", true);
        mp.gui.cursor.visible = true;

        balikBrowser = mp.browsers.new('package://files/balik-sistem/index.html');        
        balikBrowser.execute(`startGame();`);
    }
    else return;
});

mp.events.add('client:BalikOyunBitti', (status) => {
    if (balikBrowser !== null)
    {
        mp.events.call("updateBalikStatus", false);

        mp.gui.cursor.visible = false;

        balikBrowser.destroy();
        balikBrowser = null;
        mp.events.callRemote("server:BalikOyunBitti", status);
    }
    else return;
});

