const router=require('express').Router()
const parentsAction=require('../../module/parents/parents.action')

const authparent=require('../auth_all_user/auth.parent')




router.patch('/:parentsId',parentsAction.updateParents),
router.use(authparent)





module.exports=router