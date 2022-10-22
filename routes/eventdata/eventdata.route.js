const router=require('express').Router()
const eventdataAction=require('../../module/eventdata/eventdata')

router.post('/:classeId',eventdataAction.addEvent)
router.get('/:classeId',eventdataAction.getallEvent)



router.get('/ping', (req,res)=>{
  res.json("Hello from event Data")
})

module.exports=router