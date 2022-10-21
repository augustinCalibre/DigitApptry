const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const LifeSchool=new Schema({
    image:({
        type:String,
        required:false,
    }),
    titre:({
        type:String,
        required:true,
    }),
    Description:({
        type:String,
        required:false,
    }),
    ecole:({
        type:Schema.Types.ObjectId,
        ref: 'School'
    })
    
},{ timestamps: true })
module.exports=mongoose.model('LifeSchool',LifeSchool)