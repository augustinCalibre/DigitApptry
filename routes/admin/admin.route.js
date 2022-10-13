const express = require('express');
const log = require('../../helpers/logger/logger');
const router = express.Router();
const adminActions =require('../../module/admin/admin.action')
const classRoom=require('./classroom.route')
const Student=require('./student.route')
const parents=require('./parents.route')
const school=require('./school.route')
const professeur=require('./professeur.route')
const authenti=require('../auth_all_user/auth.admin');

/// This route will be use for adding admin
router.post('/user',adminActions.addAdminNew);
// Get user infos
router.get('/user',adminActions.getInfo);

// Auth userk






router.use(authenti)

router.use(classRoom),

router.use(Student)
router.use(parents)
router.use(school)
router.use(professeur)





router.get('/ping', (req,res)=>{
    res.json("Hello from admin")
})

module.exports=router;  
