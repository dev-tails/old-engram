import './ExcalidrawSettingsPage.scss';

import Excalidraw from '@excalidraw/excalidraw';
import React from 'react';

type ExcalidrawSettingsPageProps = {};

export const ExcalidrawSettingsPage: React.FC<ExcalidrawSettingsPageProps> = (
  props
) => {
  return (
    <div className="excalidraw-settings-page">
      <Excalidraw
        onChange={(elements, state) =>
          console.log("Elements :", elements, "State : ", state)
        }
        viewModeEnabled={false}
        zenModeEnabled={true}
        gridModeEnabled={true}
      />
    </div>
  );
};
