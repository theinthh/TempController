var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
mongoose.Promise = global.Promise;

var http = require('http').Server(app);
var io = require("socket.io")(http);

//connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/tempIOT' ,{ useNewUrlParser :true});
var db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to Mongo DB...')
});

var mqtt = require('mqtt');
var client = mqtt.connect('http://172.20.10.3:1883')
const TempValues = require('./models/database.js');

client.on('connect', function () {
    console.log("Connected with mqtt !");
    client.subscribe('SENSOR', function (err) {
        if (err) {
            console.log("Cant get data");
        }
        console.log("a");
    
    }); 
  
});
//send message got from MCU then send to browser with socket.emit 
client.on('message', function (topic, message) { 
    
    const tempValues = {
        temp: message.toString()
    }

    TempValues.create(tempValues, function (err, temp) {
        if (err) {
            console.log(err)
        } else {
            console.log(temp)
        }
    });
})

//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from template
app.use(express.static('views'))

var routes = require ('./routes/router');
app.use('/' ,routes);

require ('./socket')(io);
app.use(function (req ,res, next){
    var err = new Error("File not Found");
    err.status = 404 ;
    next(err);
});

app.use(function (err , req, res, next){
    res.status (err.status || 500);
    res.send(err.message);
})

http.listen(2000 , function (){
    console.log('Express app listening on port 2000');
});