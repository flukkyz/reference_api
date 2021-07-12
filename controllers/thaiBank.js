const db = require('../models')
const ThaiBank = db.ThaiBank
const Op = db.Sequelize.Op;

module.exports = {
  index: async (req, res) => {
    const { 
      q,
      active
    } = req.query

    let where = {}
    if(	active && ['0','1'].includes(active)){
      where = {
        ...where,
        ...{
          	active
        }
      }
    }
    if(q){
      where = {
        ...where,
        ...{ 
          [Op.or]: [
            {code: { [Op.like]: `%${q}%` }},
            {name_th: { [Op.like]: `%${q}%` }},
            {name_en: { [Op.like]: `%${q}%` }}
          ]
        }
      }
    }

    try {
      const lists = await ThaiBank.findAll({ where })
      return res.json(lists.map((ele) => {
        return {
          id: ele.id,
          code: ele.code,
          name_th: ele.name_th,
          name_en: ele.name_en,
          icon: `${process.env.BASE_URL}/thai-banks/${ele.code}.png`,
          active: ele.active
        }
      }))
    } catch (e) {
      return res.status(500).json({
        message: 'Cannot get data from database.'
      })
    }
  },
  show: async (req, res) => {
    const id = req.params.id
    try {
      const data = await ThaiBank.findByPk(id)
      return data ? res.json(data) : res.status(404).json({message: 'Not Found'})
    } catch (e) {
      return res.status(500).json({
        message: 'Cannot get data from database.'
      })
    }
  }
}
