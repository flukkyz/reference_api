const express = require('express')
const { searchAddressController } = require('../controllers')
const { checkParamId } = require('../middlewares')

const router = express.Router()

const path = '/search-addresses'

router.get(`${path}/`, searchAddressController.index)


module.exports = router