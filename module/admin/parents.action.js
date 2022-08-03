const log = require("../../helpers/logger/logger");
const Parent = require("../../models/parent");
const csv=require('csvtojson')


const functions = {

  addsingleParents: async (req, res) => {
    if (!req.body.name || !req.body.password) {
      log.error(req.body);
      res.status(400).res.json({
        msg: "Invalid fields"
      });
    } else {
      const newparents = Parent({
        name: req.body.name,
        prenom: req.body.prenom,
        email: req.body.email,
        tel: req.body.tel,
        photo: req.body.photo,
        ville: req.body.ville,
        password: req.body.password,
        
       
      });
      newparents.save(function (err, newparents) {
        if (err) {
          res.status(501).json({
            error: "Internal error retry later"
          });
        } else {
          res.status(200).json({
            data: newparents
          });
        }
      });
    }
  },
  
  addParents:async  (req, res) => {
    
    try {
     const jsondata=await csv({
      delimiter:';'
     })
       .fromFile(req.file.path);
       console.log(jsondata)
       
       Parent.insertMany(jsondata, function(err, docs) {
        if(err){
          log.error('Insert Many internal Erreur')
          res.status(501).json({err:err})
        }else{
          res.status(201).json({data:docs})
        }
       });

      
      

       
        
       
        

    } catch (error) {
      log.error(error);
      res.status(501).json("Internal error");
    }
  },

  
  getParents: async (req, res) => {
    try {
      let parentsId = req.params.parentsId;
      if (!parentsId) {
        log.info("parents id is not valid", parentsId);
        res.status(400).json({
          error: "Bad request"
        });
      }
      let parents = await Parent.findOne({
        _id: {
          $eq: parentsId
        }
      });
      log.info("parents retrieved", parents);
      res.json({
        data: parents
      });
    } catch (error) {
      log.error(error);
      res.status(501).json("Internal error");
    }
  },
  updateParents: async (req, res) => {
    try {
      let parentsId = req.params.parentsId;
      let parentsInfo = req.body;
      if (!parentsId || !parentsInfo) {
        log.info("parents must be supply");
        res.status(400).json({
          error: "Bad request"
        });
      }
      let parents = await Parent.updateOne({
        _id: {
          $eq: parentsId
        }
      }, {
        name: parentsInfo.name,
        prenom: parentsInfo.prenom,
        email: parentsInfo.email,
        password: parentsInfo.password,
        tel: parentsInfo.tel ?? undefined,
        photo: parentsInfo.photo ?? undefined,
        ville: parentsInfo.ville ?? undefined,
      });
      log.info("parents updated", parents);
      res.json({
        data: parents
      });
    } catch (error) {
      log.error(error);
      res.status(501).json("Internal error");
    }
  },






  deleteparents: async (req, res) => {
    try {
      let parentsId = req.params.parentsId;
      if (!parentsId) {
        log.info("parents must be supply");
        res.status(400).json({
          error: "Bad request"
        });
      }
      let parents = await Parent.deleteOne({
        _id:parentsId})

      log.info("parents deleted", parents);
      res.json({
        data: 'Suprimer avec succès'
      });
    } catch (error) {
      log.error(error);
      res.status(501).json("Internal error");
    }
  },
};

module.exports = functions;