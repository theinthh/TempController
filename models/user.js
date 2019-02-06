var mongoose = require ('mongoose');
var bcrypt = require ('bcrypt');

var UserSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    // role: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     max : Number
    // },
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    phone: {
      type: Number,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordConf: {
      type: String,
      required: true,
    },
    position:{
        type: String,
        required: true,
        trim: true
    }
});

UserSchema.statics.authenticate = function (email ,password ,callback){
    User.findOne({email : email})
    .exec((err , user) => {
        if (err){
            return  callback(err)
        }
        else if (!user){
            var err = new Error("User not found");
            err.status = 401;
            return callback(err);
        }

        bcrypt.compare(password , user.password, function(err, result){
            if(result === true){
                return callback(null , user);
            }
            else {
                return callback();
            }
        })
    })
}
mongoose.set('useCreateIndex', true);

UserSchema.pre('save' , function(next){
    var user = this;
    bcrypt.hash(user.password ,10 , function(err, hash){
        if (err){
            return next(err);
        }

        user.password = hash;
        next();
    })
})

var User = mongoose.model('User' ,UserSchema);
module.exports = User;