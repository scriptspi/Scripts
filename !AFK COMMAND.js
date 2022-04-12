 // discord https://discord.gg/aX25MCec27
// criador por Ranger#6017
// version pt-br 1.0

// Sobre: esse script é util contra spam do comando !afk e também é limitado por tempo de 1 hora, caso contrario kick o player

var room = HBInit({
roomName: "AFK Por tempo",
maxPlayers: 5,
public: true,
token: "none",
noPlayer: true
});

/* variaveis */

var message;
var AFK = [] // local dos AFKS
var limitetempoafk = 1000 * 60 * 60; // * 1000 * 60 * 60 = 1hora
var limite_AFK; // cronometro
var semspam = [] // impedir spam de AFK !Afk

let cores = {
vermelho: 0xFA5646,
laranja: 0xFFC12F,
verde: 0x7DFA89,
amarelo: 0xFFFF17
}

room.onPlayerChat = function(player,message){
message = message;
message = message.split(/ +/);
if (["!afk"].includes(message[0].toLowerCase())) {
if (AFK.includes(player.name) == true) {
var retirar = AFK.indexOf(message)
AFK.splice(retirar)
clearTimeout(limite_AFK);
room.sendAnnouncement(`${player.name} Está de volta!`, null, cores.verde, "bold");
return false;
}
else if (["!afk"].includes(message[0].toLowerCase())) {
if (semspam.includes(player.name) == true) {
room.sendAnnouncement(`${player.name} aguarde 5 segundos para usar esse comando novamente`, null, cores.vermelho, "bold");
var retirar = semspam.indexOf(message)
semspam.splice(retirar)
return false;
}
else if (AFK.includes(player.name) == false) {
if (semspam.includes(player.name) == false) {
AFK.push(player.name)
semspam.push(player.name)
room.setPlayerTeam(player.id,0);
room.sendAnnouncement(`você só pode ficar AFK por ${limitetempoafk/60/1000} minutos`, player.id, cores.laranja, "bold");
room.sendAnnouncement(`${player.name} ficou afk e não pode ser movido [AFK]`, null, cores.laranja, "bold");
limite_AFK = setTimeout(function(){
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
if (byPlayer) room.sendAnnouncement(changedPlayer.name + " está afk e não pode ser movido.", null, cores.amarelo, "bold");
}
} 