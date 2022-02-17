import { httpGet } from './Api';

type User = {
  _id: string;
  name: string;
  color: string;
}

let users: User[] = [];

export async function initializeUserApi() {
  users = await getUsers();
}

let bIsLoggedIn = false;

export function isLoggedIn() {
  return bIsLoggedIn;
}

let userGetAllPromise = null;

export async function getUsers(): Promise<User[]> {
  try {
    if (!userGetAllPromise) {
      userGetAllPromise = httpGet("/api/users");
    }
  
    const users = await userGetAllPromise;
  
    bIsLoggedIn = true;
    return users;
  } catch(err) {
    bIsLoggedIn = false;
    return [];
  }
}

export function getUser(id: string) {
  const user =  users.find((user) => user._id === id);

  if (!user) {
    return {
      _id: "-1",
      name: "MissigNo."
    }
  }

  return user;
}