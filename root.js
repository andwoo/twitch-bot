var irc = require("tmi.js");

var options = {
  options: {
        debug: false
    },
    connection: {
        random: "chat",
        reconnect: true
    },
    /*identity: {
        username: "",
        password: "oauth:"
    },*/
    channels: ["#camgears"]
};

var client = new irc.client(options);

// Connect the client to the server..
client.connect();

client.on("chat", function (channel, user, message, self) {
    console.log(channel + " <" + user["display-name"] + "> " + message);
});
