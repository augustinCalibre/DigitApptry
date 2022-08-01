const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const Classroom=new Schema({
    nom:({
        type:String,
        required:true,
    }),
    ecole:({
        type: Schema.Types.ObjectId,
        ref:'School'
    })
})
module.exports=mongoose.model('Classroom',Classroom)