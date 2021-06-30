const express = require('express')
const { nationalityController } = require('../controllers')
const { checkParamId } = require('../middlewares')

const router = express.Router()

const path = '/nationalities'

router.get(`${path}/`, nationalityController.index)
router.get(`${path}/:id`,  checkParamId, nationalityController.show)


module.exports = router