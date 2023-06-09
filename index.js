// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/:date?", function (req, res) {
  const dateStr = req.params.date;

  let date;
  if (!dateStr) {
    date = new Date();    
  } else {
    const seconds = Number(dateStr);
    if (isNaN(seconds)) {
      date = new Date(dateStr);
    } else {
      date = new Date(seconds);
    }
  }
  
  let result;

  // invalid date
  if (isNaN(date.getTime())) {
    result = { error : "Invalid Date" };
  } else {
    result = {
      unix: date.getTime(),
      utc: date.toUTCString(),
    };
  }

  res.json(result);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
