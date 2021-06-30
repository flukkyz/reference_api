const express = require('express')
const { prefixNameController } = require('../controllers')
const { checkParamId } = require('../middlewares')

const router = express.Router()

const path = '/prefix-names'

router.get(`${path}/`, prefixNameController.index)
router.get(`${path}/:id`,  checkParamId, prefixNameController.show)


module.exports = router