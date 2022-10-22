const log = require('../../helpers/logger/logger');
const Salle = require('../../models/salle');
const LifeSchool=require('../../models/salle')

const functions={
    addsalle: async (req, res) => {
        if (!req.body.name) {
        //   log.error(req.body);
          res.status(400).res.json({
            msg: "Invalid fields"
          });
        } else {
          const newsalle= Salle({
            name: req.body.titre,
            ecole:req.body.ecole
          });
          newsalle.save(function (err, newLifeSchool) {
            if (err) {
              res.status(501).json({
                
                error: err
                
              });
            } else {
              res.status(200)
            }
          });
        }
      },


     
    getallSalle:async(req,res)=>{
        // Get classroom id
        let schoolId=req.params.schoolId
        if(!schoolId){
            log.error('Invalid School Id', schoolId)
            res.status(400).json({error: 'Invalid school Id'})
        }
        // find classroom
        let salle=await Salle.find({ecole:{$eq:schoolId}})
        if(salle){
            log.info('classroom is ', salle)
            res.status(200).json({data:salle})
            return;
        }
        log.info('School with Id', schoolId, 'doesnt exist')
        res.status(204).json()
    },


     updatelifeSchool: async (req, res) => {
        try {
          let salleId= req.params.lifeschoolid;
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
            ecole: lifeschoolInfo.ecole
            
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