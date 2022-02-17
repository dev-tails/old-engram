export async function httpGet(url: string, fetchOptions?: RequestInit) {
  const res = await fetch(url, fetchOptions);
  const jsonData = await res.json();
  return jsonData.data;
}