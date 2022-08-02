const router=require('express').Router()
const studentAction=require('../../module/admin/student.action')

// Single student
router.get('/student/:studentId',studentAction.getStudent)
router.patch('/student/:studentId',studentAction.updateStudent),

// add single studdent
router.post('/student',studentAction.addsingleStudent),


// Mutiple students
router.post('/students',studentAction.addStudents)
router.get('/students/:classroomId',studentAction.getStudents)

module.exports=router