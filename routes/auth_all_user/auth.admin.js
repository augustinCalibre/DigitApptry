const express=require('express');
const router = express.Router();


const adminActions =require('../../module/admin/admin.action')


router.post('/auth',adminActions.authenticate)


module.exports=router   