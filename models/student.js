const mongoose = require('mongoose');
const Schema =mongoose.Schema;
const bcrypt=require('bcryptjs')

const studentSchema=new Schema({
        name:({
            type:String,
            required:true
        }),
        prenom:({
            type:String,
            required:true
        }),
        matricule:({
            type:String,
            required:true
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
        
        classroomId:({
            type:Schema.Types.ObjectId,
            ref:'Classroom'
        }),
        parentId:({
            type:Schema.Types.ObjectId,
            ref:'Parent'

        }),
})  

studentSchema.pre('save', function (next) {
    const student = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(student.password, salt, function (err, hash) {
                if (err) {
                    return next(err)
                }
                student.password = hash;
                next()
            })
        })
    }
    else {oke
        return next()
    }
})
studentSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if(err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}



module.exports=mongoose.model('Student',studentSchema)