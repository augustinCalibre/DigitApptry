const router=require('express').Router()
const salleAction=require('../../module/salle/salle.action')

router.post('/',type, salleAction.addsalle)
router.patch('/:lifeschoolid', salleAction.getallSalle)
// router.get('/:schoolId', lifeSchoolAction.getAllife)



router.get('/ping', (req,res)=>{
  res.json("Hello from lifeSchhool")
})

module.exports=router