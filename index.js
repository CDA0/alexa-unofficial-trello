var Alexa = require('alexa-sdk');
var Trello = require('trello');

var trello;

exports.handler = function(event, context, callback) {
  var accessToken = event.session.user.accessToken;
  trello = new Trello('08803da31ca2853f1c7413325e7db8eb', accessToken);
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
