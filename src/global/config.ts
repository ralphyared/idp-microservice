import "dotenv/config";

const getDbConfig = () => ({
  dbUrl: process.env.DB_URL || "mongodb://localhost:27017/test",
});

const getPortConfig = () => ({
  port: process.env.PORT || 3000,
});

const getAuthConfig = () => ({
  jwtSecret: process.env.JWT_SECRET || "secret",
  jwtExpiration: "1d",
  saltRounds: 12,
});

export default () => ({
  dbConfig: getDbConfig(),
  portConfig: getPortConfig(),
  authConfig: getAuthConfig(),
});
