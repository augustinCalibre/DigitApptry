const router=require('express').Router()
const studentAction=require('../../module/admin/student.action')
const multer=require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

const upload=multer({storage:storage})





// Single student
router.get('/student/:studentId',studentAction.getStudent)
router.patch('/student/:studentId',studentAction.updateStudent),

// add single studdent
router.post('/student',studentAction.addsingleStudent),


// Mutiple students
router.post('/students',upload.single('csv'), studentAction.addStudents)
router.get('/students/:classroomId',studentAction.getStudents)

module.exports=router