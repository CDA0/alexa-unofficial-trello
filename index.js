var Alexa = require('alexa-sdk');
var Trello = require('trello');

var trello;

exports.handler = function(event, context, callback) {
  var accessToken = event.session.user.accessToken;
  trello = new Trello(process.env.APP_KEY, accessToken);
  var alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {
  'ListBoardsIntent': function () {
    var self = this;
    trello.getBoards('me', function(err, boards) {
      if (err) return self.emit(':tell', 'an error occurred');
      var output = [];
      for (var i=0; i < boards.length; i++) {
        output.push(boards[i].name);
      }
      self.emit(':tell', output.join(', '));
    });
  }
};
