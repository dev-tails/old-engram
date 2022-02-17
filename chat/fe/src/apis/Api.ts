import { setURL } from '../utils/HistoryUtils';

export async function httpGet<D>(
  url: string,
  fetchOptions?: RequestInit
): Promise<D> {
  const res = await fetch(url, fetchOptions);

  if (res.status === 404) {
    setURL("/");
    return null;
  }

  const jsonData = await res.json();
  return jsonData.data;
}
