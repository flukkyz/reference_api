'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Nationality extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Nationality.init({
        nation_id: DataTypes.INTEGER,
        country_id: DataTypes.INTEGER,
        nation_name_th: DataTypes.STRING,
        nation_name_en: DataTypes.STRING,
        country_name_th: DataTypes.STRING,
        country_name_en: DataTypes.STRING,
    }, {
        sequelize,
        timestamps: false,
        tableName: 'nationalities',
        modelName: 'Nationality'
    })
    return Nationality
}