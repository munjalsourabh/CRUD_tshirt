var http = require('http');
var url = require('url');
// var fetch = require("node-fetch");

http.createServer(onRequest).listen(8080);

function onRequest(client_req, client_res) {
  var query = url.parse(client_req.url,true).query;
  console.log('query', query)
function writeToCLient(res,message){
 console.log(message);
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type','application/json');
  res.end(message);
}
message = '';
  var apiPath = "http://data.nba.net/10s/prod/" + query.apiPath;
  return http.get(apiPath, function(res){
      res.on('data',function(data){
        message += data;
      });
      res.on('end',function(){
           console.log('props called ;)');
           writeToCLient(client_res, message);
      });
 }).on('error', function(e){
      console.error(e);
 });
}
