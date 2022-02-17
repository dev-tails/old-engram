import { httpGet } from './Api';

type User = {
  _id: string;
  name: string;
}

export async function getUsers(): Promise<User[]> {
  return httpGet("/api/users", { cache: "force-cache" });
}

export async function getUser(id: string) {
  const users = await getUsers();
  const user =  users.find((user) => user._id === id);

  if (!user) {
    return {
      _id: "-1",
      name: "MissigNo."
    }
  }

  return user;
}