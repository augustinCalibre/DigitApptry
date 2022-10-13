const log = require('../../helpers/logger/logger')
const LifeSchool=require('../../models/lifeSchool')

const functions={
    addlifeSchool: async (req, res) => {
        if (!req.body.titre) {
        //   log.error(req.body);
          res.status(400).res.json({
            msg: "Invalid fields"
          });
        } else {
          const newLifeSchool= LifeSchool({
            titre: req.body.titre,
            Description: req.body.description,
            image:req.file.path,
            ecole:req.body.ecole,
          });
          newLifeSchool.save(function (err, newLifeSchool) {
            if (err) {
              res.status(501).json({
                error: "Internal error retry later"
              });
            } else {
              res.status(200).json({
                data: newLifeSchool
              });
            }
          });
        }
      },


     
    getAllife:async(req,res)=>{
        // Get classroom id
        let schoolId=req.params.schoolId
        if(!schoolId){
            log.error('Invalid School Id', schoolId)
            res.status(400).json({error: 'Invalid school Id'})
        }
        // find classroom
        let lifeSchool=await LifeSchool.find({ecole:{$eq:schoolId}})
        if(lifeSchool){
            log.info('classroom is ', lifeSchool)
            res.status(200).json({data:lifeSchool})
        }
        log.info('classroom with Id', schoolId, 'doesnt exist')
        res.status(204).json()
    },






      updatelifeSchool: async (req, res) => {
        try {
          let lifeschoolid= req.params.lifeschoolid;
          let lifeschoolInfo = req.body;
          if (!lifeschoolid || !lifeschoolInfo) {
            log.info("student must be supply");
            res.status(400).json({
              error: "Bad request"
            });
          }
          let lifeSchool= await LifeSchool.updateOne({
            _id: {
              $eq: lifeschoolid
            }
          }, {
            titre: lifeschoolInfo.titre,
            description: lifeschoolInfo.description,
            image: lifeschoolInfo.image,
            
          });
          log.info("lifeSchool updated", lifeSchool);
          res.json({
            data: lifeSchool
          });
        } catch (error) {
          log.error(error);
          res.status(501).json("Internal error");
        }
      },
    
}

module.exports=functions