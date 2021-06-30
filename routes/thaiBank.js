const express = require('express')
const { thaiBankController } = require('../controllers')
const { checkParamId } = require('../middlewares')

const router = express.Router()

const path = '/thai-banks'

router.get(`${path}/`, thaiBankController.index)
router.get(`${path}/:id`,  checkParamId, thaiBankController.show)


module.exports = router