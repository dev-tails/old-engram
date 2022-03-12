import { Api } from './Api';

type Block = {
  _id: string;
  type: "text" | "block" | "image";
  body: string;
  content: string[];
  fileUUID: string;
  parent: string;
}

export class BlockApi extends Api {
  public async getById(id: string) {
    return this.get(`/api/blocks/${id}`)
  }

  public async getAll({ type }: { type: string; }) {
    return this.get(`/api/blocks?type=${type}`)
  }

  public async create(params: Partial<Block>) {
    return this.post<Block>("/api/blocks", params)
  }

  public async update(id: string, params: { body: string; }) {
    return this.put<Block>(`/api/blocks/${id}`, params)
  }

  public async removeById(id: string) {
    return this.delete(`/api/blocks/${id}`);
  }
}

export const blockApi = new BlockApi();