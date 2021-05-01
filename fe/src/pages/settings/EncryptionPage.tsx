import './EncryptionPage.scss';

import React, { useState } from 'react';

type EncryptionPageProps = {};

export const EncryptionPage: React.FC<EncryptionPageProps> = (props) => {
  const [password, setPassword] = useState("");
  const [key, setKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const subtle = window.crypto.subtle;

  async function handleGenerateKey() {
    let enc = new TextEncoder();
    const keyMaterial = await subtle.importKey(
      "raw",
      enc.encode(password),
      "PBKDF2",
      false,
      ["deriveBits", "deriveKey"]
    );
    const salt = window.crypto.getRandomValues(new Uint8Array(16));

    const key = await subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );

    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    const message = "12345678901";
    let encoder = new TextEncoder();
    const encodedMessage = encoder.encode(message);

    const cipherText = await subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      encodedMessage
    );
    const stringToStore = ab2str(cipherText);

    const storedStringBuffer = str2ab(stringToStore);

    try {
      let decrypted = await subtle.decrypt(
        {
          name: "AES-GCM",
          iv: iv,
        },
        key,
        storedStringBuffer
      );

      let dec = new TextDecoder();
      const decoded = dec.decode(decrypted);
      console.log(decoded);
    } catch (err) {
      console.error(err);
    }
  }

  function handleToggleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handlePasswordChanged(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function ab2str(buf: ArrayBuffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buf) as any);
  }

  function str2ab(str: string) {
    var buf = new ArrayBuffer(str.length);
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }

  return (
    <div className="encryption-page">
      <div className="container">
        <h2>Encryption Settings</h2>
        <h3>Generate Encryption Key</h3>
        <label htmlFor="generate-key-passsword">Password to derive key</label>
        <input
          name="generate-key-passsword"
          type="password"
          onChange={handlePasswordChanged}
          value={password}
        />
        <button onClick={handleGenerateKey}>Generate</button>
        {/* <h3>Generated Encryption Key</h3>
        <input
          name="encryption-key"
          type={showPassword ? "text" : "password"}
          value={key}
        />
        <button onClick={handleToggleShowPassword}>
          {showPassword ? "Hide" : "Show"} Password
        </button> */}
      </div>
    </div>
  );
};
