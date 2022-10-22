const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const Salle=new Schema({
    name:({
        type:String,
        required:true,
    }),
    ecole:({
        type:Schema.Types.ObjectId,
        type:Schema.Types.ObjectId,
        ref: 'School'
    })
    
},{ timestamps: true })
module.exports=mongoose.model('Salle',Salle)