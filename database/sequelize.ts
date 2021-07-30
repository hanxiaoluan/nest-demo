import { Sequelize } from 'sequelize-typescript';
import db from '../config/db';

const sequelize = new Sequelize(
  db.mysql.database,
  db.mysql.user,
  db.mysql.password,
  {
    host: db.mysql.host || 'localhost',
    port: db.mysql.port || 3306,
    dialect: 'mysql',
    pool: {
      max: db.mysql.connectionLimit || 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((e) => {
    console.error('Unable to connect to the database:', e);
  });

export default sequelize;
