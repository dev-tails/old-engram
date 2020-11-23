import axios from "axios";

export async function createKey() {
  const res = await axios.post("/api/keys");
  const newKey = res.data.key;
  return newKey;
}

export async function deleteKey(id: string) {
  await axios.delete(`/api/keys/${id}`);
}
