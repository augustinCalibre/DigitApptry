const log = require('../../helpers/logger/logger')
const TypePermission=require('../../models/typePermission')

const functions={
    addPermission: async function (req, res) {
        if (!req.body.role){
            
            log.error('You need to supply a role')
            res.status(400).json({error: 'You need to supply a role'})
        }
        else {
            try {
                // 1,2,4,4
                let roles=req.body.role.trim().split(',')
                roles.forEach(async(role)=>{
                    log.info(role)
                    const permission = await TypePermission({
                        role:role
                    }).save();
                    log.info('Permission created', permission)
                })
                res.status(201).json({data: 'Permission created'})
            } catch (error) {
                log.error(error)
                res.status(400).json({error: 'You need to supply a role'})
            }
        }
    },

    getPermission: async function (req, res) {
            try {
                const permissions =await TypePermission.find();
                log.info('permission retrieved', permissions)
                res.status(200).json({data: permissions})
            } catch (error) {
                log.error(error)
                res.status(501).json({error: 'Internal error'})
            }
    },
}

module.exports=functions