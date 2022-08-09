const mongosse=require('mongoose');
const bcrypt=require('bcryptjs')

const Schema=mongosse.Schema;

const ParentSchema=Schema({

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
    ville:({
        type:String,
    }),

    password:({
        type:String,
        required:true,
    }),
    
})

ParentSchema.pre('save', function (next) {
    const parent = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(parent.password, salt, function (err, hash) {
                if (err) {
                    return next(err)
                }
                parent.password = hash;
                next()
            })
        })
    }
    else {oke
        return next()
    }
})
ParentSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if(err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}



module.exports=mongosse.model('Parent',ParentSchema);