const express=require('express');
const router = express.Router();


const studentActions =require('../../module/student/student.action')


router.post('/auth',studentActions.authenticate)


module.exports=router   