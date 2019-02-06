// var mqtt = require('mqtt');
// var client = mqtt.connect('http://172.20.10.3:1883')

// var app = require('express')();
// var express = require('express');
// var http = require('http').Server(app);
// var io = require("socket.io")(http);

// app.use(express.static('public'));
// // client.subscribe('LED', function (err) {
// //   if (err) {
// //     console.log("Cant get data");
// //   }
// //   console.log("a");
// // })

// app.get('/', function (req, res) {

//   res.sendFile(__dirname + '/index.html');
// });

// client.on('connect', function () {
//     console.log("Connected with mqtt !");
// });
// io.on('connection', function(socket){
//     socket.on('message', function(mess){
//         console.log(mess);
//         client.publish("LED", mess, err => {
//             if (err) {
//                 console.log("Cant get data");
//             }
//             console.log("Data sent !");
//         });
//     });
// });


// http.listen(3000, function () {
//     console.log('listening on :3030');
// });
// io.on('connection', socket => {
//   socket.on('message', msg => {
//     console.log('message is  :' + msg);   
//     });
//   });

