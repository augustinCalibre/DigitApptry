const log = require("../../helpers/logger/logger");
const Student = require("../../models/student");

const functions = {
    addStudents: async (req, res) => {
        try {
            /// Get csv file and extract student from it

        } catch (error) {
            log.error(error)
            res.status(501).json('Internal error')
        }
    },

    getStudents: async (req, res) => {
        try {

            let _classroomId = req.params.classroomId;
            if (!_classroomId) {
                log.info('classroom id is not valid', _classroomId)
                res.status(400).json({ error: 'Bad request' })
            }
            let students = await Student.find({ classroomId: { $eq: _classroomId } });
            log.info('students retrieved', students)
            res.json({ data: students })
        } catch (error) {
            log.error(error)
            res.status(501).json('Internal error')
        }
    },

    getStudent: async (req, res) => {
        try {
            let studentId = req.params.studentId;
            if (!studentId) {
                log.info('student id is not valid', studentId)
                res.status(400).json({ error: 'Bad request' })
            }
            let student = await Student.findOne({ _id: { $eq: studentId } });
            log.info('student retrieved', student)
            res.json({ data: student })
        } catch (error) {
            log.error(error)
            res.status(501).json('Internal error')
        }
    },
    updateStudent: async (req, res) => {
        try {
            let studentId = req.params.studentId;
            let studentInfo = req.body;
            if (!studentId || !studentInfo) {
                log.info('student must be supply')
                res.status(400).json({ error: 'Bad request' })
            }
            let student = await Student.updateOne({ _id: { $eq: studentId } }, {
                name: studentInfo.name,
                prenom: studentInfo.prenom,
                matricule: studentInfo.matricule,
                password: studentInfo.password,
                tel: studentInfo.tel ?? undefined,
                photo: studentInfo.photo ?? undefined,
                ville: studentInfo.ville ?? undefined,
            });
            log.info('student updated', student)
            res.json({ data: student })
        } catch (error) {
            log.error(error)
            res.status(501).json('Internal error')
        }
    }
}

module.exports = functions