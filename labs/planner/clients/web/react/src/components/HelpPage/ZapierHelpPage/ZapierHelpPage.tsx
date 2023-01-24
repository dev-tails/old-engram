import "./ZapierHelpPage.scss";

import axios from "axios";
import React, { useEffect, useState } from "react";

import { createKey, deleteKey } from "../../../ZapierApi";
import ApiKeyImage from "./api-key.png";
import MakeAZap from "./make-a-zap.png";
import ZapierSignInImage from "./zapier-sign-in-to-engram.png";

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

    getKeys();
  }, []);

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
      <div className="container">
        <h2>How to Set up Zapier</h2>
        <h3>Create an API key</h3>
        <div className="keys">
          {keys &&
            keys.map((key, index) => {
              return (
                <tr className="key">
                  <td width="100%">
                    <input
                      value={"*".repeat(64)}
                      readOnly={true}
                      disabled={true}
                    />
                  </td>
                  <td>
                    <button
                      onClick={handleDeleteClicked.bind(this, key._id, index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {!keys || !keys.length ? (
            <tr className="key">
              <td width="100%">
                <input value={key} readOnly disabled />
              </td>
              <td>
                <button onClick={handleCreateClicked}>Create</button>
              </td>
            </tr>
          ) : null}
        </div>
        <ol>
          <li>
            <a href="https://zapier.com/sign-up/">Create a Zapier account</a>{" "}
            (if you don't already have one)
          </li>
          <li>Press Create button above</li>
          <li>
            Copy the API key (it will no longer be visible after refreshing the
            page)
          </li>
          <li>
            Create a new Action or Trigger in&nbsp;
            <a href="https://zapier.com/app/zaps">Zapier</a> by clicking "Create
            Zap" or "Make a Zap"
            <img alt="Zapier Home Page" src={MakeAZap} />
          </li>
          <li>
            When Choosing an account, click "Sign in to engram"
            <img alt="Zapier Choose Account Page" src={ZapierSignInImage} />
          </li>
          <li>
            Paste API key and click "Yes, continue"
            <img alt="Enter API Key Modal" src={ApiKeyImage} />
          </li>
        </ol>
      </div>
    </div>
  );
};
