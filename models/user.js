const mongoose = require('mongoose');
const Schema =mongoose.Schema;
const bcrypt = require('bcryptjs');
const adminSchema=new Schema({
        name:({
            type:String,
            required:true
        }),
        prenom:({
            type:String,
            required:true
        }),
        email:({
            type:String,
            required:true,
        }),
        
        tel:({
            type:Number,
            required:true,
        }),
        
        photo:({
            type:String,
            required:true,
        }),
        ville:({
            type:String,
            required:true,
        }),

        typ:({
            type:Number,
            required:true,
        }),

        password:({
            type:String,
            required:true,

        }),
        
        ecole: ({ 
            type: Schema.Types.ObjectId,
             ref: 'School' })
})  


adminSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err)
                }
                user.password = hash;
                next()
            })
        })
    }
    else {oke
        return next()
    }
})
adminSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if(err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}
module.exports=mongoose.model('User',adminSchema)
