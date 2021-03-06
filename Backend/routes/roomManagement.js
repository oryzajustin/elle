var randomstring = require('randomstring');

// Generate new chat room.
exports.createRoom = function(hostID, hostToLang, hostFromLang) {

	var newRoom = new Object();
	newRoom.host = hostID;
	newRoom.second = '';
	newRoom.hostFromLang = hostFromLang;
	newRoom.hostToLang = hostToLang;
	newRoom.roomID = randomstring.generate();
	newRoom.waiting = true;

	rooms.push(newRoom);
	return newRoom;
};

// Search for open rooms - if none exist, return null.
exports.searchRooms = function(secondID, secondToLang, secondFromLang) {

	var arrayLength = rooms.length;

	for (var i = 0; i < arrayLength; i++) {
		var room = rooms[i];
		var hostFromLang = room.hostFromLang;
		var hostToLang = room.hostToLang;
		var waiting = room.waiting;

		if (secondFromLang == hostToLang && secondToLang == hostFromLang && waiting == true) {
			room.waiting = false;
			room.second = secondID;
			return room;
		}
	}
	return null;
};

// User disconnects from a room, room no longer exists with only one user.
exports.disconnect = function(room) {

	var index = rooms.indexOf(room);
	if (index > -1) {
		rooms.splice(index, 1);
	}
};