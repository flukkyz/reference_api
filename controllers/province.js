const db = require('../models')
const Province = db.Province
const Op = db.Sequelize.Op;

module.exports = {
  index: async (req, res) => {
    const { 
      q,
      	geography_id
    } = req.query

    let where = {}
    if(	geography_id && 	geography_id !== 'null' && 	geography_id !== ''){
      where = {
        ...where,
        ...{
          	geography_id
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
      const lists = await Province.findAll({ where })
      return res.json(lists)
    } catch (e) {
      return res.status(500).json({
        message: 'Cannot get data from database.'
      })
    }
  },
  show: async (req, res) => {
    const id = req.params.id
    console.log(id);
    try {
      const data = await Province.findByPk(id)
      return data ?  res.json(data) : res.status(404).json({message: 'Not Found'})
    } catch (e) {
      return res.status(500).json({
        message: 'Cannot get data from database.'
      })
    }
  }
}
