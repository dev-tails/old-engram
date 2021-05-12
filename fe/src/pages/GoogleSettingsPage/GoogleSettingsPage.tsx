import './GoogleSettingsPage.scss';

import React, { useEffect, useState } from 'react';

import * as GoogleUtils from '../../utils/GoogleUtils';

type GoogleSettingsPageProps = {};

const CLIENT_ID =
  "538993823748-pv564gq2au8696d9qqnrslqm31upa5tc.apps.googleusercontent.com";
const API_KEY = "AIzaSyAqbWayBxE3cfwFeWM-4aUlUxcKVtYKwZ0";
const SCOPES = "https://www.googleapis.com/auth/drive.file";

export const GoogleSettingsPage: React.FC<GoogleSettingsPageProps> = (
  props
) => {
  const [folderId, setFolderId] = useState("128Vr5QCdZ67WoRNA9tdYoyymEW2p8P34");
  const [files, setFiles] = useState<FileList | null>(null);
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

  async function handleCreateClicked() {
    if (!files || !files.length) {
      return;
    }
    await GoogleUtils.uploadFile({
      file: files[0],
      folderId,
    });
  }

  async function handleCreateFolderClicked() {
    await GoogleUtils.createFolder("engram");
  }

  function handleFileChanged(e: React.ChangeEvent<HTMLInputElement>) {
    setFiles(e.target.files);
  }

  return (
    <div className="google-settings-page">
      <div className="container">
        <h1>Google Settings</h1>
        {isSignedIn ? (
          <>
            <button onClick={handleCreateFolderClicked}>
              Create engram Folder
            </button>
            <input type="file" onChange={handleFileChanged}></input>
            <button onClick={handleCreateClicked}>Upload</button>
            <button onClick={handleSignOutClicked}>Sign Out</button>
          </>
        ) : (
          <button onClick={handleAuthorizeClicked}>Authorize</button>
        )}
      </div>
    </div>
  );
};
