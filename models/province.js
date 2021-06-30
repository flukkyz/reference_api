'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Province extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.belongsTo(models.Geography, {foreignKey: 'geography_id'})
      this.hasMany(models.Amphure, {foreignKey: 'province_id'})
    }
  }
  Province.init(
    {
      code: DataTypes.INTEGER,
      name_th: DataTypes.STRING,
      name_en: DataTypes.STRING,
      geography_id: DataTypes.INTEGER
    },
    {
      sequelize,
      timestamps: false,
      tableName: 'provinces',
      modelName: 'Province',
    }
  )

  return Province
}
