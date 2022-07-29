const express = require('express');
const { get } = require('mongoose');
const router = express.Router();
const actions =require('../module/action')

router.get('/',(req,res,)=>{
    res.send("hello")
})


router.post('/adduser',actions.addNew);

router.post('/auth',actions.authenticate)

router.get('/getinfo',actions.getinfo)

router.post('/addschool',actions.addschool)

module.exports=router;  