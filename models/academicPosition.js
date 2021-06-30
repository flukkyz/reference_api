'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class AcademicPosition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  AcademicPosition.init(
    {
      code: DataTypes.STRING,
      name_th: DataTypes.STRING,
      name_en: DataTypes.STRING,
      title_th: DataTypes.STRING,
      title_en: DataTypes.STRING,
      description: DataTypes.TEXT
    },
    {
      sequelize,
      timestamps: false,
      tableName: 'academic_position',
      modelName: 'AcademicPosition'
    }
  )
  return AcademicPosition
}
