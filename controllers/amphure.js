const db = require('../models')
const District = db.District
const Amphure = db.Amphure
const Province = db.Province
const Geography = db.Geography
const Op = db.Sequelize.Op;

module.exports = {
  index: async (req, res) => {
    const { 
      q,
      province_id
    } = req.query

    let where = {}
    if(province_id && province_id !== 'null' && province_id !== ''){
      where = {
        ...where,
        ...{
          province_id
        }
      }
    }
    if(q){
      where = {
        ...where,
        ...{ 
          [Op.or]: [
            {name_th: { [Op.like]: `%${q}%` }},
            {name_en: { [Op.like]: `%${q}%` }}
          ]
        }
      }
    }

    try {
      const lists = await Amphure.findAll({ where })
      return res.json(lists)
    } catch (e) {
      return res.status(500).json({
        message: 'Cannot get data from database.'
      })
    }
  },
  show: async (req, res) => {
    const id = req.params.id
    try {
      const data = await Amphure.findByPk(id)
      return data ? res.json(data) : res.status(404).json({message: 'Not Found'})
    } catch (e) {
      return res.status(500).json({
        message: 'Cannot get data from database.'
      })
    }
  },
  showAll: async (req, res) => {
    const id = req.params.id
    try {
      const data = await Amphure.findByPk(id,{
        include: [
          District,
          {
            model: Province,
            include: Geography
          }
        ]
      })
      return data ? res.json(data) : res.status(404).json({message: 'Not Found'})
    } catch (e) {
      return res.status(500).json({
        message: 'Cannot get data from database.'
      })
    }
  }
}
