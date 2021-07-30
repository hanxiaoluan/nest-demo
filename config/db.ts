const productConfig = {
  mysql: {
    port: 3306,
    host: '',
    user: '',
    password: '',
    database: 'nest_zero_to_one',
    connectionLimit: 10,
  },
};

const developmentConfig = {
  mysql: {
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: 'luanhanxiao138',
    database: 'nest_zero_to_one',
    connectionLimit: 10,
  },
};

const config = process.env.NODE_ENV ? productConfig : developmentConfig;

export default config;
