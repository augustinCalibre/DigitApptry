const log = require('../../helpers/logger/logger');
const Eventdata = require('../../models/Eventprogram');
const EmploiDutemps=require('../../models/emploidutemp')

const functions={

    getallEvent:async(req,res)=>{
        // Get classroom id
        let classId=req.params.classeId
        if(!classId){
            log.error('Invalid School Id',classId)
            res.status(400).json({error: 'Invalid classId Id'})
        }
        // find classroom
        let idEmploidutemps=await EmploiDutemps.findOne({classeId:{$eq:classId}})
        console.log(idEmploidutemps._id)
        let events=await Eventdata.find({emploidutempsId:{$eq:idEmploidutemps}})
        if(events){
            log.info('event is ',events)
            res.status(200).json({data:events})
            return;
        }
        
        log.info('School with Id',classId, 'doesnt exist')
        res.status(204).json()
    },
    
    addEvent: async (req, res) => {
        let classId=req.params.classeId
        if (!req.body.events) {
        //   log.error(req.body);
          res.status(400).json({
            msg: "Invalid fields"
          });
        } else {
        const newprograme=EmploiDutemps({
            classe:classId
        });
        newprograme.save(function(err,newprogramme){
            if(err){
                res.status(501).json({error:err})
                return;
            }else{

                let events=req.body.events;

                
                try {
                    events.forEach((event) => {
                        const newEvent= Eventdata({
                            name: event.name,
                            debut:event.debut,
                            time:event.time,
                            jour:event.jour,
                            teacherId:event.teacherId,
                            emploidutempsId:newprogramme._id
                          });
                          newEvent.save(function(err,data){
                            if(err){
                                throw Error(err)
                            }
                          })
                         
                    });
                    res.json({data:""})
                } catch (error) {
                    res.status(501).json(error)
                    return;                   
                }

                


                // const newEvent= Eventdata({
                //     name: req.body.name,
                //     debut:req.body.ecole,
                //     time:req.body.time,
                //     jour:req.body.jour,
                //     teacherId:req.body.teacher,
                //     emploidutempsId:newprogramme._id
                //   });
                //   newEvent.save(function (err, newEvent) {
                //     if (err) {
                //       res.status(501).json({
        
                //         error: err
                        
                //       });
                //     } else {
                //       res.status(200).json({event:newEvent})
                //     }
                //   });
                
            }
        })
            
        
        }
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