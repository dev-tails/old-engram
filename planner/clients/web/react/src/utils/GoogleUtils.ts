const CLIENT_ID =
  "538993823748-pv564gq2au8696d9qqnrslqm31upa5tc.apps.googleusercontent.com";
const API_KEY = "AIzaSyAqbWayBxE3cfwFeWM-4aUlUxcKVtYKwZ0";
const SCOPES = "https://www.googleapis.com/auth/drive.file";

export const isSignedIn = false;

export async function initGoogleUtils() {
  gapi.load("client:auth2", initClient);
}

async function initClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    scope: SCOPES,
  });
}

export async function createFolder(name: string) {
  const data = {
    title: name,
    mimeType: "application/vnd.google-apps.folder",
  };
  const response = await gapi.client.request({
    path: "/drive/v2/files",
    method: "POST",
    body: JSON.stringify(data),
  });

  return response;
}

export type UploadFileParams = {
  file: File;
  folderId: string;
};

export async function uploadFile({ file, folderId }: UploadFileParams) {
  const boundary = "-------314159265358979323846";
  const delimiter = "\r\n--" + boundary + "\r\n";
  const close_delim = "\r\n--" + boundary + "--";

  const contentType = file.type || "application/octet-stream";
  const metadata = {
    title: file.name,
    mimeType: contentType,
    parents: [{ id: folderId }],
  };

  const base64Data = await fileToBase64(file);
  const multipartRequestBody =
    delimiter +
    "Content-Type: application/json\r\n" +
    `Content-Disposition: form-data; name="metadata"\r\n` +
    "\r\n" +
    JSON.stringify(metadata) +
    delimiter +
    "Content-Type: " +
    contentType +
    "\r\n" +
    `Content-Disposition: form-data; name="file"` +
    "\r\n" +
    "Content-Transfer-Encoding: base64\r\n" +
    "\r\n" +
    base64Data +
    close_delim;

  const response = await gapi.client.request({
    path: "/upload/drive/v2/files",
    method: "POST",
    params: { uploadType: "multipart" },
    headers: {
      "Content-Type": 'multipart/mixed; boundary="' + boundary + '"',
    },
    body: multipartRequestBody,
  });

  return response;
}

async function fileToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = (error) => reject(error);
  });
}
