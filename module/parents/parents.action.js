const log = require("../../helpers/logger/logger");
const Parent = require("../../models/parent");
const jwt = require('jwt-simple')
const config = require('../../config/dbconfig')
const csv=require('csvtojson')


const functions = {

  authenticate: function (req, res) {
    Parent.findOne({
        name: req.body.name
    }, function (err, user) {
            if (err) throw err
            if (!user) {
                res.status(403).send({success: false, msg: "nom d'utilisateur inconnu"})
            }
            else {
                user.comparePassword(req.body.password,async function (err, isMatch) {
                    if (isMatch && !err) {
                        var token = jwt.encode(user, config.secret)
                       
                        res.json({success: true, token: token})
                    }
                    else {
                      log.error('Mot de passe incorrect')
                        return res.status(403).send({success: false, msg: 'Mots de passe incorrect'})
                    }
                })
            }
    }
    )
},

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
          log.error(err)
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


  getInfo:  async function (req, res) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        var token = req.headers.authorization.split(' ')[1]
        var decodedtoken = jwt.decode(token, config.secret)

        // const professeurdata= await Professeur.findOne({_id:{$eq:decodedtoken['ecole']}}).exec();
        // // console.log(decodedtoken)
        // decodedtoken['ecole']=schooldata.toJSON()

        // console.log(decodedtoken);
        return res.json({parentdata:decodedtoken})
    }
    else {
        return res.json({success: false, msg: 'No Headers'})
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