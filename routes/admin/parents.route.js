const router=require('express').Router()
const parentsAction=require('../../module/admin/parents.action')
const multer=require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname + '-' + uniqueSuffix)
    }
  })

const upload=multer({storage:storage})





// Single parents
router.get('/parents/:parentsId',parentsAction.getParents)
router.patch('/parents/:parentsId',parentsAction.updateParents),

// add single parents
router.post('/parent',parentsAction.addsingleParents),
router.delete('/parent/:parentsId',parentsAction.deleteparents),



// Mutiple parentss
router.post('/parents',upload.single('csv'), parentsAction.addParents)

module.exports=router