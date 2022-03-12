export class Api {
  protected async get(url: string) {
    const res = await fetch(url);
    if (res.ok) {
      const jsonData = await res.json();
      return jsonData.data;
    } else {
      throw new Error(`${res.status} Request Failed`);
    }
  }

  protected async post<ResponseData>(
    url: string,
    params: any
  ): Promise<ResponseData> {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const jsonData = await res.json();
      return jsonData.data;
    } else {
      throw new Error(`${res.status} Request Failed`);
    }
  }

  protected async put<ResponseData>(
    url: string,
    params: any
  ): Promise<ResponseData> {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const jsonData = await res.json();
      return jsonData.data;
    } else {
      throw new Error(`${res.status} Request Failed`);
    }
  }

  protected async delete(url: string) {
    const res = await fetch(url, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`${res.status} Request Failed`);
    }
  }
}
