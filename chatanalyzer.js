var ChatAnalyzer = function(prefix, regex)
{
  this.prefix = prefix;
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
  return this.prefix + this.counter + " | <" + this.userName + "> " + this.message;
};

module.exports.ChatAnalyzer = ChatAnalyzer;
