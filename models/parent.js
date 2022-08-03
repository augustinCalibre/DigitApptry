const mongosse=require('mongoose');

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


module.exports=mongosse.model('Parent',ParentSchema);