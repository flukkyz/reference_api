const express = require('express')
const { religionController } = require('../controllers')
const { checkParamId } = require('../middlewares')

const router = express.Router()

const path = '/religions'

router.get(`${path}/`, religionController.index)
router.get(`${path}/:id`,  checkParamId, religionController.show)


module.exports = router