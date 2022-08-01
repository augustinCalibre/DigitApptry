const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const typePermission=new Schema({
    role:({
        type:Number,
        required:true,

    })
})

module.exports=mongoose.model('permissionType',typePermission)
