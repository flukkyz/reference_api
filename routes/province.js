const express = require('express')
const { provinceController } = require('../controllers')
const { checkParamId } = require('../middlewares')

const router = express.Router()

const path = '/provinces'

router.get(`${path}/`, provinceController.index)
router.get(`${path}/:id`,  checkParamId, provinceController.show)
router.get(`${path}/:id/all`,  checkParamId, provinceController.showAll)


module.exports = router