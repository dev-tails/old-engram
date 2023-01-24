import { Api } from './Api';

type Page = {
  _id: string;
  type: "text" | "page" | "image";
  body: string;
  content: string[];
  fileUUID: string;
  parent: string;
}

export class PageApi extends Api {
  public async getById(id: string) {
    return this.get(`/api/pages/${id}`)
  }

  public async getAll() {
    return this.get("/api/pages")
  }

  public async create(params: Partial<Page>) {
    return this.post<Page>("/api/pages", params)
  }

  public async update(id: string, params: { body: string; }) {
    return this.put<Page>(`/api/pages/${id}`, params)
  }

  public async removeById(id: string) {
    return this.delete(`/api/pages/${id}`);
  }
}

export const pageApi = new PageApi();