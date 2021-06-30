const express = require('express')
const { congenitalDiseaseController } = require('../controllers')
const { checkParamId } = require('../middlewares')

const router = express.Router()

const path = '/congenital-diseases'

router.get(`${path}/`, congenitalDiseaseController.index)
router.get(`${path}/:id`,  checkParamId, congenitalDiseaseController.show)


module.exports = router