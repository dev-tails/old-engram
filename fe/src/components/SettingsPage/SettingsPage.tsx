import './SettingsPage.scss';

import { Checkbox, List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import _ from 'lodash';
import React, { useState } from 'react';

import { getPlugins, togglePlugin } from '../../FeatureFlags';

type SettingsPageProps = {};

export const SettingsPage: React.FC<SettingsPageProps> = (props) => {
  const [revision, setRevision] = useState(0);

  async function handleTogglePlugin(plugin: string) {
    togglePlugin(plugin);
    setRevision((r) => r + 1);
  }

  const plugins = getPlugins();

  return (
    <div className="settings-page">
      <div className="container">
        <h1>Settings</h1>
        <List subheader={<ListSubheader>Plugins</ListSubheader>}>
          {_.map(plugins, (pluginState, pluginName) => {
            return (
              <ListItem
                key={`${pluginName}-${revision}`}
                button
                onClick={handleTogglePlugin.bind(this, pluginName)}
              >
                <Checkbox
                  edge="start"
                  checked={pluginState}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": pluginName }}
                />
                <ListItemText primary={pluginName} />
              </ListItem>
            );
          })}
        </List>
      </div>
    </div>
  );
};
