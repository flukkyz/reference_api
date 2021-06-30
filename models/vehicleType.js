'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class VehicleType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  VehicleType.init(
    {
      name_th: DataTypes.STRING,
      name_en: DataTypes.STRING,
      other_name: DataTypes.STRING,
      unit: DataTypes.STRING,
      active: DataTypes.BOOLEAN
    },
    {
      sequelize,
      timestamps: false,
      tableName: 'vehicle_type',
      modelName: 'VehicleType'
    }
  )
  return VehicleType
}
