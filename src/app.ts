import "dotenv/config";
import http from "http";
import express, { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import * as commonUtils from '@eurisko/common-utils-node';

import userRoutes from "./users/user.routes.js";
import config from "./global/config.js";

commonUtils.init({
  loggerOptions: {
    level: config().loggerConfig.level,
    useConsoleLogs: true,
  },
  databaseOptions: {
    isMultiTenant: false,
    connectionUri: config().dbConfig.dbUrl,
  },
  s3Config: {
    accessKeyId: config().awsConfig.accessKeyId!,
    ACL: config().awsConfig.acl!,
    bucket: config().awsConfig.bucketName!,
    region: config().awsConfig.region!,
    secretAccessKey: config().awsConfig.secretAccessKey!,
  }
});

const port = config().portConfig.port;

const app = express();

const server = http.createServer(app);

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const status = error.status || 500;
  const messages = error.messages
    ? error.messages.toString()
    : [error.messages.toString()];
  res.status(status).send({ messages });
};

const connectDB = async () => {
  await mongoose.connect(config().dbConfig.dbUrl);
};

try {
  connectDB();
  console.log("App successfully connected to database");
} catch (err) {
  throw err;
}

app.use(bodyParser.json());

app.use("/user", userRoutes);

app.use(errorHandler);

server.listen(port, () => {
  console.log(`App listening at port ${port}...`);
});
