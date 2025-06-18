const localPlayer = mp.players.local;
const maxSpeed = 10.0;
const minHeight = 15.0;
const maxHeight = 45.0;
const maxAngle = 15.0;

mp.events.add("playerCommand", (command) => {
    if (command.toLowerCase() === "rap") {
        const vehicle = localPlayer.vehicle;
        if (!vehicle) {
            return;
        }

        if (!mp.game.invoke("0x4E417C547182C84D", vehicle.handle)) {
            mp.gui.chat.push("Bu araçtan reppel yapamazsınız.");
            return;
        }
        
        if (vehicle.getSpeed() > maxSpeed) {
            mp.gui.chat.push("Araç çok hızlı.");
            return;
        }
        
        if (vehicle.getPedInSeat(-1) === localPlayer.handle || vehicle.getPedInSeat(0) === localPlayer.handle) {
            mp.gui.chat.push("Bu koltuktan reppel yapamazsınız.");
            return;
        }
        
        const taskStatus = localPlayer.getScriptTaskStatus(-275944640);
        if (taskStatus === 0 || taskStatus === 1) {
            mp.gui.chat.push("Zaten iniyorsunuz.");
            return;
        }
        
        const curHeight = vehicle.getHeightAboveGround();
        if (curHeight < minHeight || curHeight > maxHeight) {
            mp.gui.chat.push("Araç çok yüksek/çok alçak, reppel yapılamaz.");
            return;
        }
        
        if (!vehicle.isUpright(maxAngle) || vehicle.isUpsidedown()) {
            mp.gui.chat.push("Araç stabil olmalı, reppel yapılamaz.");
            return;
        }
        

        localPlayer.clearTasks();
        localPlayer.taskRappelFromHeli(10.0);
    }
});