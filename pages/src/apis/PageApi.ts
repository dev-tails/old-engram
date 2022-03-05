import { Api } from "./Api";

export class PageApi extends Api {
  public async getAll() {
    return this.get("/api/pages")
  }
}