var express = require('express');
var app = express();

var db = require('./db');
var port = process.env.PORT || 3000;

app.use(function (req, res, next) {
    if (req.headers['x-forwarded-proto'] === 'https') {
        res.redirect('http://' + req.hostname + req.url);
    } else {
        next();
    }
});

app.use(require('./controllers'));

// Tell it which folder we want to serve.
app.use(express.static(__dirname + '../dist'));

// Connect to MySQL on start
db.connect(function(err) {
  if (err) {
    console.log('Unable to connect to MySQL.');
    process.exit(1);
  } else {
    app.listen(port, function() {
      console.log(`Listening on port ${port}...`);
    })
  }
})
