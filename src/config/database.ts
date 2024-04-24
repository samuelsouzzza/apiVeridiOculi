import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('veridioculi_db', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: 3306,
  database: 'veridioculi_db',
  define: {
    timestamps: false,
  },
});

export async function testConnection() {
  return sequelize
    .authenticate()
    .then(() => {
      return 'Conexão com banco de dados bem sucedida!';
    })
    .catch(() => {
      return 'Houve algum erro ao conectar com o banco de dados!';
    });
}
