const log = require("../../helpers/logger/logger")
const Classroom=require('../../models/classroom')

const functions={
    getClassroom:async(req,res)=>{
        // Get classroom id
        let classroomId=req.params.classroomId
        if(!classroomId){
            log.error('Invalid classroom Id', classroomId)
            res.status(400).json({error: 'Invalid classroom Id'})
            return
        }
        // find classroom
        let classroom=await Classroom.findOne({_id:{$eq:classroomId}})
        if(classroom){
            log.info('classroom is ', classroom)
            res.status(200).json({data:classroom})
            return
        }
        log.info('classroom with Id', classroomId, 'doesnt exist')
        res.status(204).json()
    },

    addClassroom:async(req,res)=>{
        try {
            // Get classroom id
        let classroomName=req.body.name;
        if(!classroomName){
            log.error('Invalid classroom Name')
            res.status(400).json({error: 'Invalid classroom name'})
            return
        }
        // find classroom
        let classroom=await Classroom({name:classroomName}).save()
        log.info(`classroom ${classroomName} created`)
        res.status(201).json({data:classroom})
        } catch (error) {
            log.error(error)
            res.status(400).json('Internal error')
        }
    }
}


module.exports=functions