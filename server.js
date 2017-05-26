// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {response.sendFile(__dirname + '/views/index.html');});

//ugly code
proxyAsset("ship","https://cdn.gomix.com/ca279048-ef8c-4de5-b39e-2a9940f455af%2Frpgcritters2.png");
proxyAsset("spider","https://cdn.gomix.com/ca279048-ef8c-4de5-b39e-2a9940f455af%2Fspider.png");
// listen for requests :)
var server = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + server.address().port);
});






var io = require('socket.io')(server);
var connectionWrapper=require('./socketwrapper');

const game = require('./game')();
var serverLogic = require('./serverlogic');
var socketConnection = connectionWrapper(io,(connection)=>{serverLogic(connection,game)});

 //ownmade



//ugly hack
var http = require('https'),
    url = require('url');
function proxyAsset(asset,url) {
    app.get("/assets/"+asset,(request,response)=>{
      var callback = function(_response) {
          if (_response.statusCode === 200) {
              response.writeHead(200, {
                  'Content-Type': _response.headers['content-type']
              });
              _response.pipe(response);
          } else {
              response.writeHead(_response.statusCode);
              response.end();
          }
      };
  
      http.get(url, callback).end();
    });
}