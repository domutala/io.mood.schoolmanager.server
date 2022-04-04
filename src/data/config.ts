/**
 * @author domutala
 * @description Ce sont les paramètres de connection de la base de données.
 * @version 0.2.0
 */

import { ConnectionOptions } from "typeorm";

const database_name = "schoolmanager";
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const DB_URL = `mongodb+srv://${username}:${password}@cluster0.fpqe5.mongodb.net/${database_name}?retryWrites=true&w=majority`;

/** EN PRODUCTION */
export const prod: ConnectionOptions = {
  type: "mongodb",
  url: DB_URL,
  useNewUrlParser: true,
  synchronize: true,
  logging: false,

  entities: ["src/data/entities/*.ts"],
  subscribers: ["src/data/subscriber/*.ts"],
  migrations: ["src/data/migration/*.ts"],

  cli: {
    entitiesDir: "src/data/entities",
    migrationsDir: "src/data/migration",
    subscribersDir: "src/data/subscriber",
  },
};

/** EN DEVELOPPEMENT */
export const dev: ConnectionOptions = {
  type: "mongodb",
  host: "localhost",
  database: database_name,

  useNewUrlParser: true,
  synchronize: true,
  logging: false,

  entities: ["src/data/entities/*.ts"],
  subscribers: ["src/data/subscriber/*.ts"],
  migrations: ["src/data/migration/*.ts"],

  cli: {
    entitiesDir: "src/data/entities",
    migrationsDir: "src/data/migration",
    subscribersDir: "src/data/subscriber",
  },
};

export default dev;
