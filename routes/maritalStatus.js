const express = require('express')
const { maritalStatusController } = require('../controllers')
const { checkParamId } = require('../middlewares')

const router = express.Router()

const path = '/marital-statuses'

router.get(`${path}/`, maritalStatusController.index)
router.get(`${path}/:id`,  checkParamId, maritalStatusController.show)


module.exports = router