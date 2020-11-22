import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { ObjectId } from "../../Database.js";

export function generateAPIKey() {
  return uuidv4();
}

export async function handleNewNote(db, note, user) {
  const ZapierHooks = db.collection("zapier-hooks");
  const hooks = await ZapierHooks.find({
    user: ObjectId(user),
    type: "new_note",
  }).toArray();

  const promises = hooks.map((hook) => {
    return axios.post(hook.hookUrl, {
      body: note.body,
    });
  });

  await promises;
}
