const router=require('express').Router()
const log=require('../../helpers/logger/logger')
const studentAction=require('../../module/student/student.action')
const authstudent=require('../auth_all_user/auth.student')


// router.post('/auth', studentAction.authenticate)
router.patch('/:studentId',studentAction.updateParents),

router.use(authstudent)

router.get('/ping', (req,res)=>{
    log.info("ping passed")
    res.json("Hello from student")
})
router.get('/user',studentAction.getInfo);


module.exports=router