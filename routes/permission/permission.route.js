const router=require('express').Router()
const permissionAction=require('../../module/permission/permission.action')

router.get('/permission',permissionAction.getPermission)

router.post('/permission',permissionAction.addPermission)

module.exports=router