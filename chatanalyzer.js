ChatAnalyzer = function(regex)
{
  this.regex = regex;
  this.counter = 0;
  this.message = "";
  this.userName = "";
  this.updateRequired = false;
}

ChatAnalyzer.prototype.OnChatMessage = function(channel, user, message, self)
{
  this.updateRequired = false;
  for(var i = 0; i < this.regex.length; i++)
  {
    var result = message.match(this.regex[i]);
    if(result)
    {
      this.updateRequired = true;
      this.counter += 1;
      this.message = message;
      this.userName = user["display-name"];
    }
  }
};

ChatAnalyzer.prototype.UpdateRequired = function()
{
  return this.updateRequired;
};

ChatAnalyzer.prototype.ToString = function()
{
  return this.counter + " | <" + this.userName + "> " + this.message;
};

exports.ChatAnalyzer = ChatAnalyzer;
