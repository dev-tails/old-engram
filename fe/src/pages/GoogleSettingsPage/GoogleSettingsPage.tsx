import "./GoogleSettingsPage.scss";

import React, { useEffect, useState } from "react";

type GoogleSettingsPageProps = {};

const CLIENT_ID =
  "538993823748-pv564gq2au8696d9qqnrslqm31upa5tc.apps.googleusercontent.com";
const API_KEY = "AIzaSyAqbWayBxE3cfwFeWM-4aUlUxcKVtYKwZ0";
const SCOPES = "https://www.googleapis.com/auth/drive.file";

export const GoogleSettingsPage: React.FC<GoogleSettingsPageProps> = (
  props
) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    gapi.load("client:auth2", initClient);
  }, []);

  async function initClient() {
    await gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      scope: SCOPES,
    });

    (gapi as any).auth2
      .getAuthInstance()
      .isSignedIn.listen(handleSignInStatusChanged);

    setIsSignedIn((gapi as any).auth2.getAuthInstance().isSignedIn.get());
  }

  function handleSignOutClicked() {
    (gapi as any).auth2.getAuthInstance().signOut();
  }

  function handleSignInStatusChanged(isSignedIn: boolean) {
    setIsSignedIn(isSignedIn);
  }

  function handleAuthorizeClicked() {
    (gapi as any).auth2.getAuthInstance().signIn();
  }

  function handleCreateClicked() {
    insertFile();
  }

  function insertFile() {
    const boundary = "-------314159265358979323846";
    const delimiter = "\r\n--" + boundary + "\r\n";
    const close_delim = "\r\n--" + boundary + "--";

    var contentType = "image/png" || "application/octet-stream";
    var metadata = {
      title: "test.png",
      mimeType: contentType,
    };

    var base64Data =
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";
    var multipartRequestBody =
      delimiter +
      "Content-Type: application/json\r\n\r\n" +
      JSON.stringify(metadata) +
      delimiter +
      "Content-Type: " +
      contentType +
      "\r\n" +
      "Content-Transfer-Encoding: base64\r\n" +
      "\r\n" +
      base64Data +
      close_delim;

    var request = gapi.client.request({
      path: "/upload/drive/v2/files",
      method: "POST",
      params: { uploadType: "multipart" },
      headers: {
        "Content-Type": 'multipart/mixed; boundary="' + boundary + '"',
      },
      body: multipartRequestBody,
    });

    request.execute(() => {});
  }

  return (
    <div className="google-settings-page">
      <div className="container">
        <h1>Google Settings</h1>
        {isSignedIn ? (
          <>
            <button onClick={handleCreateClicked}>Create test.txt</button>
            <button onClick={handleSignOutClicked}>Sign Out</button>
          </>
        ) : (
          <button onClick={handleAuthorizeClicked}>Authorize</button>
        )}
      </div>
    </div>
  );
};
