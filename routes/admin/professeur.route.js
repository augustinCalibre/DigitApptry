const router=require('express').Router()
const professeursAction=require('../../module/admin/professeur.action')
const multer=require('multer')





// Single professeurs
router.get('/professeur/:professeursId',professeursAction.getprofesseurs)
router.patch('/professeur/:professeursId',professeursAction.updateprofesseur),

// add single professeurs
router.post('/professeur',professeursAction.addsingleprofesseurs),
router.delete('/professeur/:professeursId',professeursAction.deleteprofesseurs),



// Mutiple professeurss

module.exports=router