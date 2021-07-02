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
      amphure_id
    } = req.query

    let where = {}
    if(amphure_id && amphure_id !== 'null' && amphure_id !== ''){
      where = {
        ...where,
        ...{
          amphure_id
        }
      }
    }
    if(q){
      where = {
        ...where,
        ...{ 
          [Op.or]: [
            {name_th: { [Op.like]: `%${q}%` }},
            {name_en: { [Op.like]: `%${q}%` }},
            {zip_code: { [Op.like]: `%${q}%` }}
          ]
        }
      }
    }

    try {
      const lists = await District.findAll({ where })
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
      const data = await District.findByPk(id)
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
      const data = await District.findByPk(id,{
        include: {
          model: Amphure,
          include: {
            model: Province,
            include: Geography
          }
        }
      })
      return data ? res.json(data) : res.status(404).json({message: 'Not Found'})
    } catch (e) {
      return res.status(500).json({
        message: 'Cannot get data from database.'
      })
    }
  }
}
