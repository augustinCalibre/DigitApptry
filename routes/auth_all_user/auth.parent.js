const express=require('express');
const router = express.Router();


const parentActions =require('../../module/parents/parents.action')


router.post('/auth',parentActions.authenticate)


module.exports=router   