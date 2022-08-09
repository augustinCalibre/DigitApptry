const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const Newschool=new Schema({
        
    nameSchool:({
        type:String,
        required:true,

    }),
    villeSchool:({
        type:String,
        required:true,

    }),
    logoSchool:({
        type:String,
        required:true,

    }),
    telSchool:({
        type:String,
        required:true,

    }),
    
    emailSchool:({
        type:String,
        required:true,

    }),

})





module.exports=mongoose.model('School',Newschool)