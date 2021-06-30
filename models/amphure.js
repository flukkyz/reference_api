'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Amphure extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.belongsTo(models.Province, {foreignKey: 'province_id'})
      this.hasMany(models.District, {foreignKey: 'amphure_id'})
    }
  }
  Amphure.init(
    {
      code: DataTypes.STRING,
      name_th: DataTypes.STRING,
      name_en: DataTypes.STRING,
      province_id: DataTypes.INTEGER
    },
    {
      sequelize,
      timestamps: false,
      tableName: 'amphures',
      modelName: 'Amphure'
    }
  )
  return Amphure
}
