export async function fetchUsers() {
  const res = await fetch("/api/admin/users");
  const jsonData = await res.json();
  return jsonData.data
}