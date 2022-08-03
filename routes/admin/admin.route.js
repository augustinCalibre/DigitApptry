const express = require('express');
const log = require('../../helpers/logger/logger');
const router = express.Router();
const authActions =require('../../module/admin/auth.action')
const classRoom=require('./classroom.route')
const Student=require('./student.route')
const parents=require('./professeur.route')
const school=require('./school.route')
const professeur=require('./professeur.route')



/// This route will be use for adding admin
router.post('/user',authActions.addAdminNew);
// Get user infos
router.get('/user',authActions.getInfo);
// Auth user
router.post('/auth',authActions.authenticate)


// classrooms
router.use(classRoom),

router.use(Student)
router.use(parents)
router.use(school)
router.use(professeur)





router.get('/ping',(req,res)=>{
    log.info("ping passed")
    res.json("Hello from admin")
})

module.exports=router;  
