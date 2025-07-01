require('./files/main.js');
require('./files/natives.js');
require('./files/events.js');
require('./files/zones.js');
require('./files/xmr-sistem/xmr.js');
require('./files/new_voip.js');
require('./files/heli.js');
require('./files/VehicleSync.js');
require('./files/heli2.js');


const localPlayer = mp.players.local;

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
/*mp.events.add('syncLight2', (vehicle, sound) => {
    vehicle.setSirenSound(sound)
    chat.push('Syncid');
})*/
