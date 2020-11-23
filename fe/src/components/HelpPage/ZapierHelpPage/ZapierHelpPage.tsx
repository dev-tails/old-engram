import axios from "axios";
import React, { useEffect, useState } from "react";
import { createKey, deleteKey } from "../../../ZapierApi";
import { Header } from "../../header/Header";
import "./ZapierHelpPage.scss";

type ZapierHelpPageProps = {};
type Key = { _id: string };

export const ZapierHelpPage: React.FC<ZapierHelpPageProps> = (props) => {
  const [keys, setKeys] = useState<Key[] | null>(null);
  const [key, setKey] = useState("");

  useEffect(() => {
    async function getKeys() {
      const res = await axios.get("/api/keys");
      const keys = res.data;
      setKeys(keys);
    }

    if (!keys) {
      getKeys();
    }
  });

  const handleCreateClicked = async () => {
    const newKey = await createKey();
    setKey(newKey);
  };

  const handleDeleteClicked = async (id: string, index: number) => {
    await deleteKey(id);
    const keysCopy = Array.from(keys || []);
    keysCopy.splice(index, 1);
    setKeys(keysCopy);
  };

  return (
    <div className="zapier-help-page">
      <Header title="Zapier Help" />
      <div className="container" style={{ marginTop: 64 }}>
        <h2>How to Set up Zapier</h2>
        <h3>Create an API Key</h3>
        {keys &&
          keys.map((key, index) => {
            return (
              <div>
                <input value={"*".repeat(64)} readOnly={true} disabled={true} />
                <button
                  onClick={handleDeleteClicked.bind(this, key._id, index)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        <input value={key} />
        <button onClick={handleCreateClicked}>Create</button>
      </div>
    </div>
  );
};
