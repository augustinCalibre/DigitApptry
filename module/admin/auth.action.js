const AdminUser = require('../../models/user')
const jwt = require('jwt-simple')
const config = require('../../config/dbconfig')
const school = require('../../models/school')
const log = require('../../helpers/logger/logger')

const functions = {
    addAdminNew: function (req, res) {
        if ((!req.body.name) || (!req.body.password)) {
            log.error(req.body)
            res.status(400).json({error: 'Invalid fields'})
        }
        else {
            const newAdminUser = AdminUser({
                name:req.body.name,
                prenom:req.body.prenom,
                email:req.body.email,
                tel:req.body.tel,
                photo:req.body.photo,
                ville:req.body.ville,
                typ:req.body.typ,
                password: req.body.password,
                ecole:req.body.ecole
            });
            newAdminUser.save(function (err, newAdminUser) {
                if (err) {
                    res.json({success: false, msg: `Failed to save${err}`})
                }
                else {
                    res.json({success: true, msg: 'Successfully saved'})
                }
            })
        }
    },

    authenticate: function (req, res) {
        AdminUser.findOne({
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
                           const schooldata= await school.findOne({_id:{$eq:user['ecole']}}).exec()
                            let _n=user.toObject()
                            _n['ecole']=schooldata;
                            res.json({success: true, token: token,admindata:_n})
                        }
                        else {
                            return res.status(403).send({success: false, msg: 'Mots de passe incorrect'})
                        }
                    })
                }
        }
        )
    },

    getInfo:  async function (req, res) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            var token = req.headers.authorization.split(' ')[1]
            var decodedtoken = jwt.decode(token, config.secret)

            const schooldata= await school.findOne({_id:{$eq:decodedtoken['ecole']}}).exec();
            // console.log(decodedtoken)
            decodedtoken['ecole']=schooldata.toJSON()

            console.log(decodedtoken);
            return res.json({admindata:decodedtoken})
        }
        else {
            return res.json({success: false, msg: 'No Headers'})
        }
    },

    verifyAuth:function(req,res,next){
        try {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                let token = req.headers.authorization.split(' ')[1]
                let decodedtoken = jwt.decode(token, config.secret)
                next();
            }
            res.status(400).json({error:'you must supply token'})
        } catch (error) {
            log.error(error)
            res.status(400).json({error:'token not valid'})
        }
    }
}

module.exports = functions