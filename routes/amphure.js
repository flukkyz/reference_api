const express = require('express')
const { amphureController } = require('../controllers')
const { checkParamId } = require('../middlewares')

const router = express.Router()

const path = '/amphures'

router.get(`${path}/`, amphureController.index)
router.get(`${path}/:id`,  checkParamId, amphureController.show)


module.exports = router