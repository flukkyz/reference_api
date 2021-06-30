const express = require('express')
const { geographyController } = require('../controllers')
const { checkParamId } = require('../middlewares')

const router = express.Router()

const path = '/geographies'

router.get(`${path}/`, geographyController.index)
router.get(`${path}/:id`,  checkParamId, geographyController.show)


module.exports = router