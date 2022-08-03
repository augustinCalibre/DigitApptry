const mongosse=require('mongoose');
const bcrypt = require('bcryptjs');

const Schema=mongosse.Schema;


const ProfesseurSchema=Schema({

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
    }),
   
    tel:({
        type:String,
    }),
    photo:({
        type:String,
    }),
    password:({
        type:String,
        required:true,
    }),
    
})


ProfesseurSchema.pre('save', function (next) {
    const prof = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(prof.password, salt, function (err, hash) {
                if (err) {
                    return next(err)
                }
                prof.password = hash;
                next()
            })
        })
    }
    else {oke
        return next()
    }
})
ProfesseurSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if(err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}



module.exports=mongosse.model('Professeur',ProfesseurSchema);