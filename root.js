var irc = require("tmi.js");
var ChatAnalyzer = require("./chatanalyzer").ChatAnalyzer;

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
    channels: ["#esl_csgo", "#esl_csgob"]
};

var vacChecker = new ChatAnalyzer([/[v]+[a]+[c]+/ig]);
var teamOneChecker = new ChatAnalyzer([/[f]+[n]+[a]+[t]+[i]+[c]+/ig]);
var teamTwoChecker = new ChatAnalyzer([/[n]+[a]+[v]+[i]+/ig]);
var timedOutCount = 0;
var timedOutUser = "";

var chat = [""];
var maxChat = 10;

var client = new irc.client(options);
client.connect();

client.on("chat", function (channel, user, message, self)
{
  vacChecker.OnChatMessage(channel, user, message, self);
  teamOneChecker.OnChatMessage(channel, user, message, self);
  teamTwoChecker.OnChatMessage(channel, user, message, self);

  if(chat.length >= maxChat)
  {
    chat.shift();
  }
  chat.push("<" + user["display-name"] + "> " +message);
  
  OutputData();
});

client.on("timeout", function (channel, username)
{
  timedOutCount += 1;
  timedOutUser = username;
});

function OutputData()
{
  //console.log('\033[2J');
  process.stdout.write('\033c');
  console.log("Number of timed out users: " + timedOutCount + " | " + timedOutUser);
  console.log("Number of VAC mentions:    " + vacChecker.ToString());
  console.log("Number of Team 1 mentions: " + teamOneChecker.ToString());
  console.log("Number of Team 2 mentions: " + teamTwoChecker.ToString());
  console.log("");

  for(var i = 0; i < chat.length; i++)
  {
    console.log(chat[i]);
  }
}
