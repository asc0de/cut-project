var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/build/index.html')
})

app.use(express.static(__dirname + '/build'));

app.listen(80)