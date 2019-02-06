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
//   io.on('connection', socket => {
//     socket.on('message', msg => {
//       console.log('message is  :' + msg);
//       client.publish("LED", msg, err => {
//         if (err) {
//           console.log("Cant get data");
//         }
//         console.log("published");
//       });
//     });
//   });
// }







  // client.publish("LED", 'a', err => {
  //   if (err) {
  //     console.log("Cant get data");
  //   }
  //   console.log("a");
  // });

//   client.subscribe('SENSOR', function (err) {
//     if (err) {
//       console.log("Cant get data");
//     }
//     console.log("a");
//   });
// }
//     else {
//     client.publish("LED", 'b', err => {
//       if (err) {
//         console.log("Cant get data");
//       }
//       console.log("b");
//     });
//   }
//     count++;
// }

// setInterval(blink, 5000);
// })


// client.on('message', function (topic, message) {
//   // message is Buffer
//   console.log(message.toString());
//   //client.end()
// })
