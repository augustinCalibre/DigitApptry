const mongoose = require('mongoose');
const Schema =mongoose.Schema;
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
})  


module.exports=mongoose.model('Student',studentSchema)