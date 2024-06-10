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

const getLoggerConfig = () => ({
  level: process.env.LOGGER_LEVEL || "info",
});

const getAwsConfig = () => ({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  configEmail: process.env.AWS_CONFIG_EMAIL,
  region: process.env.AWS_REGION,
  acl: process.env.AWS_ACL,
  bucketName: process.env.AWS_BUCKET_NAME,
});

export default () => ({
  dbConfig: getDbConfig(),
  portConfig: getPortConfig(),
  authConfig: getAuthConfig(),
  loggerConfig: getLoggerConfig(),
  awsConfig: getAwsConfig(),
});
