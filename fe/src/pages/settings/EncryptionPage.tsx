import './EncryptionPage.scss';

import React, { ChangeEvent, useEffect, useState } from 'react';

import { addKey, getKey } from '../../db/db';
import { getKeyFromJwk } from '../../utils/CryptoUtils';

type EncryptionPageProps = {};

export const EncryptionPage: React.FC<EncryptionPageProps> = (props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [customKeyString, setCustomKeyString] = useState("");
  const [key, setKey] = useState<JsonWebKey | null>(null);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    async function fetchKey() {
      const key = await getKey();
      setKey(key);
    }
    fetchKey();
  }, []);

  const subtle = window.crypto.subtle;

  async function handleGenerateKey() {
    let key = await subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"]
    );
    const jwk = await subtle.exportKey("jwk", key);
    handleSaveKey(jwk);
  }

  function handleToggleShowKey() {
    setShowKey(!showKey);
  }

  function handleCustomKeyChanged(e: ChangeEvent<HTMLTextAreaElement>) {
    setCustomKeyString(e.target.value);
  }

  async function handleSaveCustomKey() {
    const jwk = JSON.parse(customKeyString);
    try {
      // Will fail if invalid JsonWebKey
      await getKeyFromJwk(jwk);
      handleSaveKey(jwk);
    } catch (err) {
      setErrorMessage(err.message);
    }
  }

  async function handleSaveKey(jwk: JsonWebKey) {
    await addKey(jwk);
    setKey(jwk);
    setShowKey(true);
  }

  return (
    <div className="encryption-page">
      <div className="container">
        <h2>Encryption Settings</h2>
        {!key ? (
          <>
            <h3>Encryption Key</h3>
            <>
              <h4>Generate New Key</h4>
              <button onClick={handleGenerateKey}>Generate</button>
            </>
            <>
              <h4>Use Existing Key</h4>
              <p>{errorMessage}</p>
              <textarea
                value={customKeyString}
                onChange={handleCustomKeyChanged}
                rows={12}
                style={{ width: "100%" }}
              />
              <button onClick={handleSaveCustomKey}>Save</button>
            </>
          </>
        ) : null}
        {key ? (
          <>
            <button onClick={handleToggleShowKey}>
              {showKey ? "Hide" : "Show"} Key
            </button>
            <br />
            {showKey ? <code>{JSON.stringify(key, null, 2)}</code> : null}
          </>
        ) : null}
      </div>
    </div>
  );
};
