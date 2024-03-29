const log = require("../../helpers/logger/logger");
const jwt = require('jwt-simple')
const config = require('../../config/dbconfig')
const Professeur = require("../../models/professeur");


const functions = {

  addsingleprofesseurs: async (req, res) => {
    if (!req.body.name || !req.body.password) {
      log.error(req.body);
      res.status(400).res.json({
        msg: "Invalid fields"
      });
    } else {
      const newprofesseurs = Professeur({
        name: req.body.name,
        prenom: req.body.prenom,
        email: req.body.email,
        tel: req.body.tel,
        photo: req.body.photo,
        password: req.body.password,
        
       
      });
      newprofesseurs.save(function (err, newprofesseurs) {
        if (err) {
          log.error(err)
          res.status(501).json({
            error: "Internal error retry later",err:err
          });
        } else {
          res.status(200).json({
            data: newprofesseurs
          });
        }
      });
    }
  },

getprofesseurs: async (req, res) => {
    try {
      let professeursId = req.params.professeursId;
      if (!professeursId) {
        log.info("professeur id is not valid", professeursId);
        res.status(400).json({
          error: "Bad request"
        });
      }
      let professeurs = await Professeur.findOne({
        _id: {
          $eq: professeursId
        }
      });
      log.info("professeurs retrieved", professeurs);
      res.json({
        data: professeurs
      });
    } catch (error) {
      log.error(error);
      res.status(501).json("Internal error");
    }
  },

  authenticate: function (req, res) {
    Professeur.findOne({
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

  // Modifier un professeurs
  updateprofesseur: async (req, res) => {
    try {
      let professeursId = req.params.professeursId;
      let professeursInfo = req.body;
      if (!professeursId || !professeursInfo) {
        log.info("professeurs must be supply");
        res.status(400).json({
          error: "Bad request"
        });
      }
      let professeurs = await Professeur.updateOne({
        _id: {
          $eq: professeursId
        }
      }, {
        name: professeursInfo.name,
        prenom: professeursInfo.prenom,
        email: professeursInfo.email,
        password: professeursInfo.password,
        tel: professeursInfo.tel ?? undefined,
        photo: professeursInfo.photo ?? undefined,
      });
      log.info("professeurs updated", professeurs);
      res.json({
        data: professeurs
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
        return res.json({professeursdata:decodedtoken})
    }
    else {
        return res.json({success: false, msg: 'No Headers'})
    }
},




  deleteprofesseurs: async (req, res) => {
    try {
      let professeursId = req.params.professeursId;
      if (!professeursId) {
        log.info("professeurs must be supply");
        res.status(400).json({
          error: "Bad request"
        });
      }
      let professeurs = await Professeur.deleteOne({
        _id:professeursId})

      log.info("professeurs deleted", professeurs);
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