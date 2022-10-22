const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const Eventdata=new Schema({
    name:({
        type:String,
        required:true,
    }),
    debut:({
        type:Number,
        required:true,
    }),
    // temps du cours en séconde en seconde
    time:({
        type:Number,
        required:true,
    }),
    jour:({
        type:String,
        required:true,
    }),
    
    
    teacherId:({
        type:Schema.Types.ObjectId,
        ref: 'Professeur'
    }),

    emploidutempsId:({
        type:Schema.Types.ObjectId,
        ref: 'EmploiDutemps'
    }),
    

},{ timestamps: true })
module.exports=mongoose.model('Eventdata',Eventdata)