'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Geography extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.hasMany(models.Province, {foreignKey: 'geography_id'})
    }
  }
  Geography.init(
    {
      name_th: DataTypes.STRING,
      name_en: DataTypes.STRING
    },
    {
      sequelize,
      timestamps: false,
      tableName: 'geographies',
      modelName: 'Geography'
    }
  )
  return Geography
}
