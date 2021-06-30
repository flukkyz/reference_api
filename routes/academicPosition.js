const express = require('express')
const { academicPositionController } = require('../controllers')
const { checkParamId } = require('../middlewares')

const router = express.Router()

const path = '/academic-positions'

router.get(`${path}/`, academicPositionController.index)
router.get(`${path}/:id`,  checkParamId, academicPositionController.show)


module.exports = router