export class Api {
  protected async get(url: string) {
    const res = await fetch(url);
    if (res.ok) {
      const jsonData = await res.json();
      return jsonData.data;
    } else {
      throw new Error(`${res.status} Request Failed`)
    }
  }
}
