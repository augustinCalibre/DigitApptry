const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const EmploiDutemps=new Schema({
        
    classe:({
        type:Schema.Types.ObjectId,
        ref: 'Classroom',
        required:true
    })
    

},{ timestamps:true})
module.exports=mongoose.model('EmploiDutemps',EmploiDutemps)