import express, { Request, Response, NextFunction } from "express";

import { createConnection } from "typeorm";
import AppError from "./errors/AppError";

import routes from './infra/routes/'

const PORT = process.env.PORT || 5001;

const app = express();

app.use(express.json());
app.use(routes);

 app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
})

const server = app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://0.0.0.0:${PORT}`);
});

createConnection()
  .then((_) => console.log("☁ [database]: Database connection established"))
  .catch((error) =>
    console.error(`⚠ [database]: Couldn't connect to the database: ${error}`)
  );
