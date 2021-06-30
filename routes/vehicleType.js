const express = require('express')
const { vehicleTypeController } = require('../controllers')
const { checkParamId } = require('../middlewares')

const router = express.Router()

const path = '/vehicle-types'

router.get(`${path}/`, vehicleTypeController.index)
router.get(`${path}/:id`,  checkParamId, vehicleTypeController.show)


module.exports = router