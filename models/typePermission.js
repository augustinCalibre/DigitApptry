const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const typePermission=new Schema({
        
    numPerm:({
        type:Number,
        required:true,

    })
})