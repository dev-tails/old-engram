import './EncryptionPage.scss';

import React, { useEffect, useState } from 'react';

import { addKey, getKey } from '../../db/db';

type EncryptionPageProps = {};

export const EncryptionPage: React.FC<EncryptionPageProps> = (props) => {
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
    await addKey(jwk);
    setKey(jwk);
    setShowKey(true);
  }

  function handleToggleShowKey() {
    setShowKey(!showKey);
  }

  return (
    <div className="encryption-page">
      <div className="container">
        <h2>Encryption Settings</h2>
        <h3>Encryption Key</h3>
        {!key ? (
          <button onClick={handleGenerateKey}>Generate</button>
        ) : (
          <>
            <button onClick={handleToggleShowKey}>
              {showKey ? "Hide" : "Show"} Key
            </button>
            <br />
            {showKey ? <code>{JSON.stringify(key, null, 2)}</code> : null}
          </>
        )}
      </div>
    </div>
  );
};
