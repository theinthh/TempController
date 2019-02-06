var express = require('express');
var router = express.Router();
var User = require('../models/user');
var app = express();

app.set('views', './views');
app.set('view engine', 'pug');

// var userData = {
//     email: 'thha@gmail.com',
//     role : 'admin',
//     username: 'thha',
//     phone : 1111,
//     password: 'thha',
//     passwordConf: 'thha',
//     position : 'chief',
// }

// User.create(userData, function (error, user) {
//     if (error){
//         return error;
//     }
//     else {
//         req.session.userid = user._id; 
//     }
// })

router.get('/', function (req, res, next) {
    return res.render('forms.pug');
});

router.post('/', function (req, res, next) {
    if (req.body.password !== req.body.passwordConf) {
        var err = new Error("Passwords do not match");
        err.status = 400;
        res.send('Passwords not match');
        return next(err);
    }

    if (req.body.email &&
        req.body.username &&
        req.body.phone &&
        req.body.position &&
        req.body.password &&
        req.body.passwordConf) {
        var userData = {
            email: req.body.email,
            username: req.body.username,
            phone : req.body.phone,
            position : req.body.position,
            password: req.body.password,
            passwordConf: req.body.passwordConf
        }

        User.create(userData, function (error, user) {
            if (error){
                return next(error);
            }
            else {
                req.session.userid = user._id; 
                return res.redirect('/home');
            }
        })
    }
    else if(req.body.logemail && req.body.logpassword){
        User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
            if(error || !user){
                var err = new Error("Wrong Email or Password");
                err.status = 401;
                return next(err);
            }
            else {
                req.session.userid = user._id;
                return res.redirect('/home');
            }
        })

    }

    else {
        var err = new Error("All fields required");
        err.status = 400;
        return next(err);
    }
})

router.get('/home' , function (req, res, next){
    return res.render('home.pug');
})

router.get('/profile' , function(req , res, next){
    User.findById(req.session.userid)
    .exec(function(err ,user){
        if(err){
            return next(err)
        }
        else {
            if (user === null){
                var err = new Error("Not authorized !!! GO BACK !!!");
                err.status = 400;
                return next(err);
            }
            else {
                console.log(user._id);
                return res.render('profile.pug' , {
                    name : user.username,
                    email :  user.email,
                    phone : user.phone,
                    position : user.position
                });
            }
        }
      
    });
});

router.get('/onoff', function (req, res, next){
    User.findById(req.session.userid)
    .exec(function(err ,user){
        if(err){
            return next(err);
        }
        else {
            if (user === null){
                var err = new Error("Not authorized !!! GO BACK !!!");
                err.status = 400;
                return next(err);
            }
            else {
                console.log(user._id);
                return res.render('controls.pug');
            }
        }
      
    });
})
router.get('/logout', function (req, res, next) {
    if (req.session) {
      // delete session object
      req.session.destroy(function (err) {
        if (err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
  });

// var mqtt = require('mqtt');
// var client = mqtt.connect('http://172.20.10.3:1883')
// const TempValues = require('../models/database.js');

// client.on('connect', function () {
//     console.log("Connected with mqtt !");
//     client.subscribe('SENSOR', function (err) {
//         if (err) {
//             console.log("Cant get data");
//         }
//         console.log("a");
    
//     }); 
  
// });
// //send message got from MCU then send to browser with socket.emit 
// client.on('message', function (topic, message) { 
    
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

module.exports = router;
