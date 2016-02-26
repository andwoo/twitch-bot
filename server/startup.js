"use strict";

var irc = require("tmi.js");

var options = {
  options: {
    debug: false
  },
  connection: {
    cluster: "main",
    reconnect: true
  },
  channels: [
    "summit1g"
  ]
};

var client = new irc.client(options);

client.on("connect", function (channel, user, message, self) {
    console.log("connected");
});

var gexp = new RegExp(/\b(sumRip|sum1g)\b/ig);

client.on("chat", function (channel, user, message, self) {
  /* /\b(v+a+c+)\b/ig */
  let result = gexp.exec(message);
  if(result) {
    console.log(`${user["display-name"]}: ${message}`);
  }
});

// Connect the client to the server..
client.connect();
