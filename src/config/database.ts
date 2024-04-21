import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('veridioculi_db', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: 3306,
  database: 'veridioculi_db',
  define: {
    timestamps: false,
  },
});

console.log('Conectado ao banco de dados!');

export default sequelize;
