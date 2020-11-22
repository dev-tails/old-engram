import dotenv from "dotenv";

let env = null;

export function getEnv() {
  if (!env) {
    initializeEnv();
  }

  return env;
}

export function initializeEnv() {
  dotenv.config();
  env = {
    origin: process.env.ORIGIN,
    url: process.env.DB_URL,
    port: Number(process.env.PORT) || 4000,
    jwtSecret: process.env.JWT_SECRET,
  };
}
