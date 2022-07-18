const User = require('../models/user')
const School= require('../models/school')
const jwt = require('jwt-simple')
const config = require('../config/dbconfig')

const functions = {
    addschool:function (req, res) {
        if ((!req.body.nameSchool) || (!req.body.villeSchool)||(!req.body.logoSchool)||(!req.body.telSchool)||(!req.body.emailSchool)) {
            res.json({success: false, msg: 'Enter all fields'})
        }
        else {
            const newSchool = School({
                nameSchool:req.body.nameSchool,
                villeSchool:req.body.villeSchool,
                logoSchool:req.body.logoSchool,
                telSchool:req.body.telSchool,
                emailSchool:req.body.emailSchool

            });
            newSchool.save(function (err, newSchool) {
                if (err) {
                    res.json({success: false, msg: `Failed to save${err}`})
                }
                else {
                    res.json({success: true, msg: 'Successfully saved'})
                }
            })
        }
    },

    addNew: function (req, res) {
        if ((!req.body.name) || (!req.body.password)) {
            res.json({success: false, msg: 'Enter all fields'})
        }
        else {
            const newUser = User({
                name:req.body.name,
                prenom:req.body.prenom,
                email:req.body.email,
                tel:req.body.tel,
                photo:req.body.photo,
                ville:req.body.ville,
                typ:req.body.typ,
                password: req.body.password,
                ettablissement:req.body.ettablissement,
            });
            newUser.save(function (err, newUser) {
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
        User.findOne({
            name: req.body.name
        }, function (err, user) {
                if (err) throw err
                if (!user) {
                    res.status(403).send({success: false, msg: "nom d'utilisateur inconnu"})
                }

                else {
                    user.comparePassword(req.body.password, function (err, isMatch) {
                        if (isMatch && !err) {
                            var token = jwt.encode(user, config.secret)
                            res.json({success: true, token: token,user:user})
                        }
                        else {
                            return res.status(403).send({success: false, msg: 'Mots de passe incorrect'})
                        }
                    })
                }
        }
        )
    },

    getinfo: function (req, res) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            var token = req.headers.authorization.split(' ')[1]
            var decodedtoken = jwt.decode(token, config.secret)
            return res.json({success: true, msg: 'Hello ' + decodedtoken.name})
        }
        else {
            return res.json({success: false, msg: 'No Headers'})
        }
    }
}

module.exports = functions