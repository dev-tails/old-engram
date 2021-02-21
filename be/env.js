import dotenv from 'dotenv';
import fs from 'fs';

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
    url: readSecret("DB_URL"),
    jwtSecret: readSecret("JWT_SECRET"),
    origin: process.env.ORIGIN,
    port: Number(process.env.PORT) || 4000,
    production: process.env.NODE_ENV === "production",
  };
}

function readSecret(secretName) {
  try {
    return fs.readFileSync(`/run/secrets/${secretName.toLowerCase()}`, "utf8");
  } catch (err) {
    if (err.code !== "ENOENT") {
      console.error(
        `An error occurred while trying to read the secret: ${secretName}. Err: ${err}`
      );
    } else {
      console.debug(
        `Could not find the secret, probably not running in swarm mode: ${secretName}. Err: ${err}`
      );
    }
  }
  return process.env[secretName];
}
