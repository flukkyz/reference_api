const express = require('express')
const { levelEducationController } = require('../controllers')
const { checkParamId } = require('../middlewares')

const router = express.Router()

const path = '/level-educations'

router.get(`${path}/`, levelEducationController.index)
router.get(`${path}/:id`,  checkParamId, levelEducationController.show)


module.exports = router