const School= require('../../models/school')

const functions = {
    addSchool:function (req, res) {
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
                    res.status(501).json({error: 'Internal error retry later'})
                }
                else {
                    res.json({data: newSchool})
                }
            })
        }
    },

    getSchool:async function (req, res) {
        if ((!req.params.schoolId)) {
            res.json({data: 'You need to supply a school Id'})
        }
        else {
            let schoolId=req.params.schoolId;
            try {
                const newSchool =await School.findOne({_id:{$eq:schoolId}});
                if(newSchool){
                    res.json({data: newSchool})
                    return
                }
                res.status(400).json({error:'no school found'})
            } catch (error) {
                    res.status(501).json({error: 'Internal error retry later'})
            }
        }
    }
}

module.exports=functions