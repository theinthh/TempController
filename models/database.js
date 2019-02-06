//var mqtt = require('mqtt');
//var client = mqtt.connect('http://172.20.10.3:1883')

var mongoose = require('mongoose');

// client.on('connect', function () {
//     client.subscribe('SENSOR', function (err) {
//         if (err) {
//             console.log("Cant get data");
//         }
//     });
// });

const tempSchema = new mongoose.Schema({
    temp: {
        type: String, required: true
    },
    date: { type: Date, default: Date.now },
});



const TempValues = mongoose.model('TempValues', tempSchema);

module.exports = TempValues;

// client.on('message', function (topic, message) {

//     console.log(message.toString());
//     const tempValues = {
//         temp: message.toString()
//     }

//     TempValues.create(tempValues, function (err, temp) {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log(temp)
//         }
//     });
// })

