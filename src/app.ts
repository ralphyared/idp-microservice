import "dotenv/config";
import http from "http";
import express, { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import userRoutes from "./users/user.routes.js";

const port = 3001;

const app = express();

const server = http.createServer(app);

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  const status = error.statusCode || 500;
  const messages = status == 400 ? error.messages : [error.message];
  res.status(status).send({ messages });
};

const connectDB = async () => {
  await mongoose.connect(process.env.DB_URL!);
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
