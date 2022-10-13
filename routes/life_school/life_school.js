const router=require('express').Router()
const lifeSchoolAction=require('../../module/life_school/life_school')
const multer=require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname+ '-' + uniqueSuffix)
    }
  })

const upload=multer({storage:storage})



const type=upload.single('image');





router.post('/',type, lifeSchoolAction.addlifeSchool)
router.patch('/:lifeschoolid',type, lifeSchoolAction.updatelifeSchool)
router.get('/', lifeSchoolAction.getAllLifeSchool)


router.get('/ping', (req,res)=>{
  res.json("Hello from lifeSchhool")
})

module.exports=router