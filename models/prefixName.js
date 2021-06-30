'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class PrefixName extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  PrefixName.init(
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      title: DataTypes.STRING,
      dpa_code: DataTypes.INTEGER
    },
    {
      sequelize,
      timestamps: false,
      tableName: 'prefix_name',
      modelName: 'PrefixName'
    }
  )
  return PrefixName
}
