const db = require('../models')
const Nationality = db.Nationality
const Op = db.Sequelize.Op;

module.exports = {
  index: async (req, res) => {
    const { q } = req.query

    let where = q ? { [Op.or]: [
        {nation_name_th: { [Op.like]: `%${q}%` }},
        {nation_name_en: { [Op.like]: `%${q}%` }},
        {country_name_th: { [Op.like]: `%${q}%` }},
        {country_name_en: { [Op.like]: `%${q}%` }}
    ] } : null

    try {
      const lists = await Nationality.findAll({ where })
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
      const data = await Nationality.findByPk(id)
      return data ? res.json(data) : res.status(404).json({message: 'Not Found'})
    } catch (e) {
      return res.status(500).json({
        message: 'Cannot get data from database.'
      })
    }
  }
}
