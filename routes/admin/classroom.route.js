const router=require('express').Router();
const classrommAction=require('../../module/admin/classroom.action')

router.get('/classroom/:classroomId',classrommAction.getClassroom)
router.post('/classroom',classrommAction.addClassroom)
router.get('/classrooms/:schoolId',classrommAction.getAllClassroom)


module.exports=router