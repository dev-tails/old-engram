import axios from "axios";

export async function getMe() {
  const res = await axios.get("/api/users/me");
  return res.data;
}
