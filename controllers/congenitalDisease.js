const db = require('../models')
const CongenitalDisease = db.CongenitalDisease
const Op = db.Sequelize.Op;

module.exports = {
  index: async (req, res) => {
    const { q } = req.query

    let where = q ? { [Op.or]: [
        {name_th: { [Op.like]: `%${q}%` }},
        {name_en: { [Op.like]: `%${q}%` }}
    ] } : null

    try {
      const lists = await CongenitalDisease.findAll({ where })
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
      const data = await CongenitalDisease.findByPk(id)
      return data ? res.json(data) : res.status(404).json({message: 'Not Found'})
    } catch (e) {
      return res.status(500).json({
        message: 'Cannot get data from database.'
      })
    }
  }
}
