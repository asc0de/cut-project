const http = require('http');
const https = require('https');
const fs = require("fs");
const read = fs.readFileSync;
const express = require("express");

// HTTP server
let httpApp = express();
let httpRouter = express.Router();

httpApp.use('/', httpRouter);
httpRouter.get('/', function(req, res){
    // if (req.protocol === "http") {
    //   let host = req.get('host');
    //   let destination = ['https://', host, req.url].join('');
    //   return res.redirect(destination);
    // } else {
      return res.sendFile(__dirname + '/build/index.html')
    // }
});

http.createServer(httpApp).listen(80);

httpApp.use(express.static(__dirname + '/build'));

// HTTPS server
let app = express();
let certificate = read("./ssl/website.crt", 'utf8');
let chainLines = read("./ssl/intermediate_domain_ca.crt", 'utf8').split("\n");
let cert = [];
let ca = [];
chainLines.forEach(function(line) {
  cert.push(line);
  if (line.match(/-END CERTIFICATE-/)) {
    ca.push(cert.join("\n"));
    cert = [];
  }
});

let httpsOptions = {
  key: read('./ssl/privatekey.key'),
  cert: certificate,
  ca: ca
};

secServer = https.createServer(httpsOptions, httpApp);
secServer.listen(443);