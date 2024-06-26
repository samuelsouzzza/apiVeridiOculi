import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

const Users = sequelize.define(
  'Users',
  {
    id_user: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    complete_name_user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email_user: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    cpf_user: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    premium_user: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'users',
  }
);

export default Users;
