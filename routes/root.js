const express = require('express');
const router = express.Router();
const adminRoute=require('./admin/admin.route') 

const permissionRoute=require('./permission/permission.route')
const parentsRoute=require('./parent/parent.route')
const studentRoute=require('./student/student.route')
const professeurRoute=require('./professeur/professeur.route')





router.use('/admin',adminRoute)
router.use('/parent',parentsRoute)
router.use('/student',studentRoute)
router.use('/professeur',professeurRoute)



router.use(permissionRoute)



module.exports=router;  
