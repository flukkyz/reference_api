const express = require('express')
const { militaryStatusController } = require('../controllers')
const { checkParamId } = require('../middlewares')

const router = express.Router()

const path = '/military-statuses'

router.get(`${path}/`, militaryStatusController.index)
router.get(`${path}/:id`,  checkParamId, militaryStatusController.show)


module.exports = router