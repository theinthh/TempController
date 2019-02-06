var mqtt = require('mqtt');
var client = mqtt.connect('http://172.20.10.3:1883')
//const TempValues = require('./models/database.js');

client.on('connect', function () {
    // console.log("Connected with mqtt !");
    client.subscribe('SENSOR', function (err) {
        if (err) {
            console.log("Cant get data");
        }
      
    }); 
  
});
  
module.exports =(io) => {

        io.of('/onoff').on('connection', function (socket) {
            console.log("Io connected");
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
            });
          
          });
}
