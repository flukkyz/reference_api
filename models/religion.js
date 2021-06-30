'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Religion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Religion.init(
    {
      name_th: DataTypes.STRING,
      name_en: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: false,
      tableName: 'religions',
      modelName: 'Religion'
    }
  )
  return Religion
}
