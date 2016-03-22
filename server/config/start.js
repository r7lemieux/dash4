#!/usr/bin/env node
var
  app = require('../../app')
  //initApp = require('initApp')
  ;
//initApp.buildClientScriptList();

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('DASH app started. Express server listening on port ' + server.address().port);
});


