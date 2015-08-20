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
    channels: ["#esl_csgo", "#esl_csgob"]
};

var client = new irc.client(options);

// Connect the client to the server..
client.connect();

var update = false;
var vacCount = 0;
var c9Count = 0;
var mouzCount = 0;
var timedOutCount = 0;
var vacMessage = "";
var c9Message = "";
var mouseMessage = "";
var timedOutUser = "";

client.on("chat", function (channel, user, message, self)
{
  update = false;

  var result = message.match(/[v]+[a]+[c]+/ig);
  if(result)
  {
    vacCount += 1;
    vacMessage = message;
    update = true;
  }

  var result = message.match(/[c]+[9]+/ig);
  if(result)
  {
    c9Count += 1;
    c9Message = message;
    update = true;
  }
  else
  {
    var result = message.match(/[c]+[l]+[o]+[u]+[d]+[9]+/ig);
    if(result)
    {
      c9Count += 1;
      c9Message = message;
      update = true;
    }
  }

  var result = message.match(/[m]+[o]+[u]+[z]+/ig);
  if(result)
  {
    mouzCount += 1;
    mouseMessage = message;
    update = true;
  }
  else
  {
    var result = message.match(/[m]+[o]+[u]+[s]+[e]+/ig);
    if(result)
    {
      mouzCount += 1;
      mouseMessage = message;
      update = true;
    }
  }

  if(update)
  {
    OutputData();
  }
});

client.on("timeout", function (channel, username)
{
  timedOutCount += 1;
  timedOutUser = username;
  OutputData();
});

function OutputData()
{
  //console.log('\033[2J');
  process.stdout.write('\033c');
  console.log("     Number of timed out users: " + timedOutCount + " | " + timedOutUser);
  console.log("        Number of VAC mentions: " + vacCount + " | " + vacMessage);
  console.log("         Number of C9 mentions: " + c9Count + " | " + c9Message);
  console.log("Number of MouseSports mentions: " + mouzCount + " | " + mouseMessage);
}
/*var timedOutResult = "the user has been timed out".match(/has been timed out/ig);
console.log(timedOutResult);*/
