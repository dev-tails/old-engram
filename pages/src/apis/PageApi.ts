import { Api } from "./Api";

type Page = {
  _id: string;
  body: string;
  content: string[];
}

type CreatePageResponseData = Page[];

export class PageApi extends Api {
  public async getById(id: string) {
    return this.get(`/api/pages/${id}`)
  }

  public async getAll() {
    return this.get("/api/pages")
  }

  public async create(params: { body: string }) {
    return this.post<CreatePageResponseData>("/api/pages", params)
  }
}

export const pageApi = new PageApi();