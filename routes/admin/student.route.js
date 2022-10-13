const router=require('express').Router()
const studentAction=require('../../module/student/student.action')
const multer=require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })

const upload=multer({storage:storage})
const type=upload.single('image');






// Single student
router.get('/student/:studentId',studentAction.getStudent)
router.patch('/student/:studentId',studentAction.updateStudent),

// add single studdent
router.post('/student',type,studentAction.addsingleStudent),

//delete  single Student
router.delete('/student/:studentId',studentAction.deletestudent),


// Mutiple students
router.post('/students',upload.single('csv'), studentAction.addStudents)
router.get('/students/:classroomId',studentAction.getStudents)
router.get('/students/parent/:parentId',studentAction.getStudentsparents)


module.exports=router