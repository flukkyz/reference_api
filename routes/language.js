const express = require('express')
const { languageController } = require('../controllers')
const { checkParamId } = require('../middlewares')

const router = express.Router()

const path = '/languages'

router.get(`${path}/`, languageController.index)
router.get(`${path}/:id`,  checkParamId, languageController.show)


module.exports = router