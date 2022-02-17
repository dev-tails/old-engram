import { httpGet } from './Api';

type User = {
  _id: string;
  name: string;
}

let userGetAllPromise = null;

export async function getUsers(): Promise<User[]> {
  if (!userGetAllPromise) {
    userGetAllPromise = httpGet("/api/users");
  }
  return userGetAllPromise;
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