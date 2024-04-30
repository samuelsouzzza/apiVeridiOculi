import { sequelize } from '../config/database';
import { DataTypes } from 'sequelize';

const Analysis = sequelize.define(
  'Analysis',
  {
    id_analysis: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    target_species_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_analysis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status_analysis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id_user',
      },
    },
  },
  {
    tableName: 'analysis',
  }
);

export default Analysis;
