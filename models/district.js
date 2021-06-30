'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class District extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.belongsTo(models.Amphure, {foreignKey: 'amphure_id'})
    }
  }
  District.init(
    {
      zip_code: DataTypes.INTEGER,
      name_th: DataTypes.STRING,
      name_en: DataTypes.STRING,
      amphure_id: DataTypes.INTEGER
    },
    {
      sequelize,
      timestamps: false,
      tableName: 'districts',
      modelName: 'District'
    }
  )
  return District
}
