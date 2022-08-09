const express=require('express');
const router = express.Router();


const professeurActions =require('../../module/professeur/professeur.action')


router.post('/auth',professeurActions.authenticate)


module.exports=router   