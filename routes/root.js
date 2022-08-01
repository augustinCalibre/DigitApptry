const express = require('express');
const router = express.Router();
const adminRoute=require('./admin/admin.route') 
const permissionRoute=require('./permission/permission.route') 


router.use('/admin',adminRoute)
router.use(permissionRoute)

module.exports=router;  
