const log = require('../../helpers/logger/logger');
const EmploiDutemps = require('../../models/emploidutemp');

const functions={
    addemploidutemps: async (req, res) => {
        if (!req.body.idclass) {
        //   log.error(req.body);
          res.status(400).res.json({
            msg: "Invalid fields"
          });
        } else {
          const newEmploi= EmploiDutemps({
            classe: req.body.idclass,
          });
          newsalle.save(function (err, newEmploi) {
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
   


     
}

module.exports=functions