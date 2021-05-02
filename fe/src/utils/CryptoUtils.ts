const algorithm = "AES-GCM";

export async function encrypt(
  jwk: JsonWebKey,
  data: string | null | undefined
) {
  if (!data) {
    return {
      iv: null,
      encryted: null,
    };
  }

  const key = await window.crypto.subtle.importKey(
    "jwk",
    jwk,
    algorithm,
    false,
    ["encrypt", "decrypt"]
  );
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  let encoder = new TextEncoder();
  const encodedMessage = encoder.encode(data);

  const cipherText = await window.crypto.subtle.encrypt(
    {
      name: algorithm,
      iv: iv,
    },
    key,
    encodedMessage
  );

  return {
    encrypted: cipherText,
    iv,
  };
}

export async function decrpyt(
  key: CryptoKey,
  iv: Uint8Array,
  data: Uint8Array
) {
  let decrypted = await window.crypto.subtle.decrypt(
    {
      name: algorithm,
      iv: iv,
    },
    key,
    data
  );

  let dec = new TextDecoder();
  const decoded = dec.decode(decrypted);
  return decoded;
}

export function ab2str(buf: ArrayBuffer | undefined) {
  if (!buf) {
    return "";
  }
  return String.fromCharCode.apply(null, new Uint8Array(buf) as any);
}

export function str2ab(str: string) {
  var buf = new ArrayBuffer(str.length);
  var bufView = new Uint8Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
