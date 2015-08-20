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
    //channels: ["#esl_csgo", "#esl_csgob"]
    channels:["#vulcunfs"]
};

var analyzers = [
  new ChatAnalyzer("Number of VACusations: ", [/[v]+[a]+[c]+/ig]),
  new ChatAnalyzer("Number of KAPPAs:      ", [/[k]+[a]+[p]+[a]+/ig]),
  new ChatAnalyzer("Number of LOLs:        ", [/[l]+[o]+[l]+/ig]),
  new ChatAnalyzer("Number of LMAOs:       ", [/[l]+[m]+[a]+[o]+/ig]),
  new ChatAnalyzer("Number of ROFLs:       ", [/[r]+[o]+[f]+[l]+/ig])
];

var timedOutCount = 0;
var timedOutUser = "";

var chat = [""];
var maxChat = 12;

var client = new irc.client(options);
client.connect();

client.on("chat", function (channel, user, message, self)
{
  for (var i = 0; i < analyzers.length; i++)
  {
    analyzers[i].OnChatMessage(channel, user, message, self);
  }

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
  for (var i = 0; i < analyzers.length; i++)
  {
    console.log(analyzers[i].ToString());
  }

  console.log("");

  for(var i = 0; i < chat.length; i++)
  {
    console.log(chat[i]);
  }
}
