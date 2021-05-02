import './EncryptionPage.scss';

import React, { useState } from 'react';

type EncryptionPageProps = {};

export const EncryptionPage: React.FC<EncryptionPageProps> = (props) => {
  const [key, setKey] = useState<JsonWebKey | null>(null);
  const [showPassword, setShowPassword] = useState(false);

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
    setKey(jwk);
    setShowPassword(true);
  }

  function handleToggleShowPassword() {
    setShowPassword(!showPassword);
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
            <button onClick={handleToggleShowPassword}>
              {showPassword ? "Hide" : "Show"} Password
            </button>
            <br />
            {showPassword ? <code>{JSON.stringify(key, null, 2)}</code> : null}
          </>
        )}
      </div>
    </div>
  );
};
