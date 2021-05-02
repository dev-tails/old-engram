export type Key = {
  localId: string;
  alg: "A256GCM";
  ext: boolean;
  k: string;
  key_ops: ["encrypt", "decrypt"];
  kty: "oct";
  createdAt: Date;
  updatedAt: Date;
};
