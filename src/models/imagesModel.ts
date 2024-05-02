import { sequelize } from '../config/database';
import { DataTypes } from 'sequelize';

export const Images = sequelize.define('Images', {
  id_image: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  original_path_image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ia_path_image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  species_name_image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accuracy_image: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  id_analysis: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Analysis',
      key: 'id_analysis',
    },
  },
});

export default Images;
