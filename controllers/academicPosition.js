const db = require('../models')
const AcademicPosition = db.AcademicPosition
const Op = db.Sequelize.Op;

module.exports = {
  index: async (req, res) => {
    const { q } = req.query

    let where = q ? { [Op.or]: [
        {name_th: { [Op.like]: `%${q}%` }},
        {name_en: { [Op.like]: `%${q}%` }},
        {title_th: { [Op.like]: `%${q}%` }},
        {title_en: { [Op.like]: `%${q}%` }}
    ] } : null

    try {
      const lists = await AcademicPosition.findAll({ where })
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
      const data = await AcademicPosition.findByPk(id)
      return data ? data : res.status(404).json({message: 'Not Found'})
    } catch (e) {
      return res.status(500).json({
        message: 'Cannot get data from database.'
      })
    }
  }
}
