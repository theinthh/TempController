var mqtt = require('mqtt');
var client = mqtt.connect('http://172.20.10.3:1883')

var mongoose = require('mongoose');
const TempValues = require('./database.js');

var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require("socket.io")(http);

app.use(express.static('public'));
// client.subscribe('LED', function (err) {
//   if (err) {
//     console.log("Cant get data");
//   }
//   console.log("a");
// })

app.get('/', function (req, res) {

    res.sendFile(__dirname + '/index.html');
});

client.on('connect', function () {
    console.log("Connected with mqtt !");
    client.subscribe('SENSOR', function (err) {
        if (err) {
            console.log("Cant get data");
        }
        client.subscribe('SENSOR', function (err) {
            if (err) {
                console.log("Cant get data");
            }
        });
    
    }); 

});

io.on('connection', function (socket) {
    socket.on('message', function (mess) {
        console.log(mess);
        client.publish("LED", mess, err => {
            if (err) {
                console.log("Cant get data");
            }
            console.log("Data sent !");
        });
    });

    //send message got from MCU then send to browser with socket.emit 
    client.on('message', function (topic, message) {
        socket.emit('mess', message.toString());
        
        console.log(message.toString());
        
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

});



// io.on('connection', function (socket) {
//     client.on('message', function (topic, message) {
//         socket.emit('message', message.toString());
//         console.log(message.toString());
//     });
// });

http.listen(3000, function () {
    console.log('listening on :3030');
});
