const router=require('express').Router()
const log=require('../../helpers/logger/logger')
const professeurAction=require('../../module/professeur/professeur.action')
const authentificate=require('../auth_all_user/auth.professeur')

// router.post('/auth', studentAction.authenticate)
router.patch('/:professeurId',professeurAction.updateprofesseur),


router.get('/ping', (req,res)=>{
    log.info("ping passed")
    res.json("Hello from professeur")
}),

router.get('/user',professeurAction.getInfo);

router.use(authentificate)

module.exports=router