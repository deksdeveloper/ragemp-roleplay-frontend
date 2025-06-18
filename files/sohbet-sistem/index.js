if(mp.storage.data.timeStamp === undefined)
    mp.storage.data.timeStamp = false;
if(mp.storage.data.pageSize === undefined)
    mp.storage.data.pageSize = 18;
if(mp.storage.data.fontSize === undefined)
    mp.storage.data.fontSize = 0.9;
if(mp.storage.data.toggleChat === undefined)
    mp.storage.data.toggleChat = true;

mp.gui.chat.show(false);
const chat = mp.browsers.new('package://files/sohbet-sistem/index.html');
chat.markAsChat();

let TarayiciAcikmi = false;

mp.events.add("updateTarayiciStatus", (status) => {
    TarayiciAcikmi = status;
});


let balikAcikmi = false;

mp.events.add("updateBalikStatus", (status) => {
    balikAcikmi = status;
});


chat.execute(`setToggleTimestamp(${mp.storage.data.timeStamp});`);
chat.execute(`setPageSize(${mp.storage.data.pageSize});`);
chat.execute(`setFontSize(${mp.storage.data.fontSize});`);
chat.execute(`setToggleChat(${mp.storage.data.toggleChat});`);

mp.keys.bind(0x76, true, () => {
	mp.events.callRemote("server:pressKeyF7");
});

mp.keys.bind(0x54, true, () => {
	if (TarayiciAcikmi === true) return;
    if (balikAcikmi === true) return;
    if (chat) {
        mp.events.callRemote("server:pressKeyT");
    }
});

function chatKey()
{
    chat.execute(`chatKey();`);
}
mp.events.add("client:chatKey", chatKey)

mp.events.add("client:loadChatSettings", (timeStamp, toggleChat, fontSize, pageSize) => {
    if (chat) {
        if(pageSize < 4 || pageSize > 24) pageSize = 18;
        if(fontSize < 0.5 || fontSize > 1.5) pageSize = 0.9;

        chat.execute(`setToggleTimestamp(${timeStamp});`);
        chat.execute(`setPageSize(${pageSize});`);
        chat.execute(`setFontSize(${fontSize});`);
        chat.execute(`setToggleChat(${toggleChat});`);
    }
});

mp.events.add("client:onPlayerChatMessage", (message) => {
    mp.events.callRemote("server:onPlayerMessage", message);
});

mp.events.add("client:chatMessage", (message) => {
    if (chat) {
        chat.execute(`chatAPI.push('${message}');`);
    }
});

mp.events.add("client:setTimestamp", (timeStamp) => {
    if (chat) {
        chat.execute(`setToggleTimestamp('${timeStamp}');`);
    }
});

mp.events.add("client:setPagesize", (pageSize) => {
    if (chat) {
        if(pageSize < 4 || pageSize > 24)
        {
            return;
        }
        chat.execute(`setPageSize('${pageSize}');`);
    }
});

mp.events.add("client:setFontsize", (fontSize) => {
    if (chat) {
        if(fontSize< 0.5 || fontSize > 1.5)
        {
            return;
        }

        chat.execute(`setFontSize('${fontSize}');`);
    }
});

mp.events.add("client:toggleChat", (status) => {
    if (chat) {   
        chat.execute(`chatAPI.show('${status}');`);
        chat.execute(`chatAPI.activate('${status}');`);
    }
});

mp.players.local.lastMessage = new Date().getTime();
mp.events.add("setLastMessage", (ms) =>
{
    mp.players.local.lastMessage = ms + 350;
});

mp.events.add("client:clearChat", () =>
{
    chat.execute(`chatAPI.clear();`);
});