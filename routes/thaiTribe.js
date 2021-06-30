const express = require('express')
const { thaiTribeController } = require('../controllers')
const { checkParamId } = require('../middlewares')

const router = express.Router()

const path = '/thai-tribes'

router.get(`${path}/`, thaiTribeController.index)
router.get(`${path}/:id`,  checkParamId, thaiTribeController.show)


module.exports = router