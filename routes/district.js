const express = require('express')
const { districtController } = require('../controllers')
const { checkParamId } = require('../middlewares')

const router = express.Router()

const path = '/districts'

router.get(`${path}/`, districtController.index)
router.get(`${path}/:id`,  checkParamId, districtController.show)
router.get(`${path}/:id/all`,  checkParamId, districtController.showAll)


module.exports = router