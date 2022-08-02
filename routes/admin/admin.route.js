const express = require('express');
const log = require('../../helpers/logger/logger');
const router = express.Router();
const authActions =require('../../module/admin/auth.action')
const schoolActions =require('../../module/admin/school.action')
const classRoom=require('./classroom.route')
const Student=require('./student.route')

/// This route will be use for adding admin
router.post('/user',authActions.addAdminNew);
// Get user infos
router.get('/user',authActions.getInfo);
// Auth user
router.post('/auth',authActions.authenticate)

router.post('/school',schoolActions.addSchool)
router.get('/school/:schoolId',schoolActions.getSchool)

// classrooms
router.use(classRoom),

router.use(Student)


router.get('/ping',(req,res)=>{
    log.info("ping passed")
    res.json("Hello from admin")
})

module.exports=router;  
