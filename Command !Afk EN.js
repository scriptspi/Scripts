 // discord https://discord.gg/aX25MCec27
// create by Ranger#6017
// version en 1.0

// About: this script is useful against !afk command spam and is also limited by 1 hour time, otherwise kick the player

var room = HBInit({
    roomName: "AFK Time",
    maxPlayers: 5,
    public: true,
    token: "none",
    noPlayer: true
});

/* variables */

var message;
var AFK = [] // AFKS location
var limittimeafk = 1000 * 60 * 60; // * 1000 * 60 * 60 = 1 hour
var limit_AFK; // stopwatch
var nospam = [] // prevent spam from AFK !Afk

let colors = {
    red: 0xFA5646,
    orange: 0xFFC12F,
    green: 0x7DFA89,
    yellow: 0xFFFF17
}

room.onPlayerChat = function(player,message){
    message = message;
    message = message.split(/ +/);
    if (["!afk"].includes(message[0].toLowerCase())) {
    if (AFK.includes(player.name) == true) {
    var retirar = AFK.indexOf(message)
    AFK.splice(retirar)
    clearTimeout(limit_AFK);
    room.sendAnnouncement(`${player.name} is back again!`, null, colors.green, "bold");
    return false;
}
else if (["!afk"].includes(message[0].toLowerCase())) {
    if (nospam.includes(player.name) == true) {
    room.sendAnnouncement(`${player.name} wait 5 seconds to use this command again`, null, colors.red, "bold");
    var retirar = nospam.indexOf(message)
    nospam.splice(retirar)
    return false;
}
    else if (AFK.includes(player.name) == false) {
        if (nospam.includes(player.name) == false) {
            AFK.push(player.name)
                nospam.push(player.name)
                    room.setPlayerTeam(player.id,0);
                    room.sendAnnouncement(`you can only stay AFK for ${limittimeafk/60/1000} minutes`, player.id, colors.orange, "bold");
                    room.sendAnnouncement(`${player.name} now afk and can't be moved [AFK]`, null, colors.orange, "bold");
                    limit_AFK = setTimeout(function(){
                    room.kickPlayer(player.id, 'Limite de AFK Execedido', false)
                    }, 1000 * 60 * 60);
                }
            }
        }
    }
}

room.onPlayerTeamChange = function(changedPlayer,byPlayer){
    if (AFK.includes(changedPlayer.name)) {
room.setPlayerTeam(changedPlayer.id, 0);
    if (byPlayer) room.sendAnnouncement(changedPlayer.name + " afk and can't be moved [AFK].", null, colors.yellow, "bold");
    }
}
