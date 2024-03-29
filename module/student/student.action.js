const log = require("../../helpers/logger/logger");
const Student = require("../../models/student");
const jwt = require('jwt-simple')
const config = require('../../config/dbconfig')
const csv=require('csvtojson')


const functions = {
  updateParents: async (req, res) => {
    try {
      let studentId = req.params.studentId;
      let studentInfo = req.body;
      if (!studentId || !studentInfo) {
        log.info("parents must be supply");
        res.status(400).json({
          error: "Bad request"
        });
      }
      let student = await Student.updateOne({
        _id: {
          $eq: studentId
        }
      }, {
        name: studentInfo.name,
        prenom: studentInfo.prenom,
        email: studentInfo.email,
        password: studentInfo.password,
        tel: studentInfo.tel ?? undefined,
        photo: studentInfo.photo ?? undefined,
        ville: studentInfo.ville ?? undefined,
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
        return res.json({elevedata:decodedtoken})
    }
    else {
        return res.json({success: false, msg: 'No Headers'})
    }
},
  authenticate: function (req, res) {
    Student.findOne({
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








  addsingleStudent: async (req, res) => {
    if (!req.body.name || !req.body.password) {
      log.error(req.body);
      res.status(400).res.json({
        msg: "Invalid fields"
      });
    } else {
      const newstudent = Student({
        name: req.body.name,
        prenom: req.body.prenom,
        matricule: req.body.matricule,
        tel: req.body.tel,
        photo: req.file.path,
        ville: req.body.ville,
        password: req.body.password,
        ecole:req.body.ecole,
        parentsId:req.body.parentsId,
        classroomId: req.body.class,
      });
      newstudent.save(function (err, newstudent) {
        if (err) {
          res.status(501).json({
            error: "Internal error retry later"
          });
        } else {
          res.status(200).json({
            data: newstudent
          });
        }
      });
    }
  },
  
  addStudents:async  (req, res) => {
    
    try {
     const jsondata=await csv({
      delimiter:';'
     })
       .fromFile(req.file.path);
       console.log(jsondata)
       
       Student.insertMany(jsondata, function(err, docs) {
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

  getStudents: async (req, res) => {
    try {
      let _classroomId = req.params.classroomId;
      if (!_classroomId) {
        log.info("classroom id is not valid", _classroomId);
        res.status(400).json({
          error: "Bad request"
        });
      }
      let students = await Student.find({
        classroomId: {
          $eq: _classroomId
        }
      });
      log.info("students retrieved", students);
      res.json({
        data: students
      });
    } catch (error) {
      log.error(error);
      res.status(501).json("Internal error");
    }
  },
  getStudentsparents: async (req, res) => {
    try {
      let _parentId = req.params.parentId;
      if (!_parentId) {
        log.info("classroom id is not valid", _parentId);
        res.status(400).json({
          error: "Bad request"
        });
      }
      let students = await Student.find({
        parentId: {
          $eq: _parentId
        }
      });
      log.info("students retrieved", students);
      res.json({
        data: students
      });
    } catch (error) {
      log.error(error);
      res.status(501).json("Internal error");
    }
  },

  getStudent: async (req, res) => {
    try {
      let studentId = req.params.studentId;
      if (!studentId) {
        log.info("student id is not valid", studentId);
        res.status(400).json({
          error: "Bad request"
        });
      }
      let student = await Student.findOne({
        _id: {
          $eq: studentId
        }
      });
      log.info("student retrieved", student);
      res.json({
        data: student
      });
    } catch (error) {
      log.error(error);
      res.status(501).json("Internal error");
    }
  },
  updateStudent: async (req, res) => {
    try {
      let studentId = req.params.studentId;
      let studentInfo = req.body;
      if (!studentId || !studentInfo) {
        log.info("student must be supply");
        res.status(400).json({
          error: "Bad request"
        });
      }
      let student = await Student.updateOne({
        _id: {
          $eq: studentId
        }
      }, {
        name: studentInfo.name,
        prenom: studentInfo.prenom,
        matricule: studentInfo.matricule,
        password: studentInfo.password,
        
        tel: studentInfo.tel ?? undefined,
        photo: studentInfo.photo ?? undefined,
        ville: studentInfo.ville ?? undefined,
        classroomId:studentInfo.classroomId,
        parentId:studentInfo.parentId,
      });
      log.info("student updated", student);
      res.json({
        data: student
      });
    } catch (error) {
      log.error(error);
      res.status(501).json("Internal error");
    }
  },


  deletestudent: async (req, res) => {
    try {
      let studentId = req.params.studentId;
      if (!studentId) {
        log.info("student must be supply");
        res.status(400).json({
          error: "Bad request"
        });
      }
      let student = await Student.deleteOne({
        _id:studentId})

      log.info("student deleted",student);
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