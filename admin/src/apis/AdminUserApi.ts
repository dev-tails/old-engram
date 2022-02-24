export type User = {
  name: string;
  email: string;
  password: string;
  color: string;
  superuser: boolean;
};

export async function postCreateUser(user: Partial<User>) {
  const res = await fetch("/api/admin/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const jsonData = await res.json();
  return jsonData.data;
}

export async function fetchUsers() {
  const res = await fetch("/api/admin/users");
  const jsonData = await res.json();
  return jsonData.data;
}
