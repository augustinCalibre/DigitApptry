const router=require('express').Router()
const schoolActions =require('../../module/admin/school.action')



router.post('/school',schoolActions.addSchool)
router.get('/school/:schoolId',schoolActions.getSchool)


module.exports=router