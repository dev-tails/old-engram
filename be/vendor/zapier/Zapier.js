import { v4 as uuidv4 } from "uuid";

export function generateAPIKey() {
  return uuidv4();
}
