import "./SettingsPage.scss";

import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import _ from "lodash";
import React, { useState } from "react";

import { getPlugins, togglePlugin } from "../../FeatureFlags";
import { Settings } from "@material-ui/icons";
import { Link } from "react-router-dom";

type SettingsPageProps = {};

export const SettingsPage: React.FC<SettingsPageProps> = (props) => {
  const [revision, setRevision] = useState(0);

  async function handleTogglePlugin(plugin: string) {
    togglePlugin(plugin);
    setRevision((r) => r + 1);
  }

  const plugins = getPlugins();

  function getSettingsRouteForPluginName(pluginName: string) {
    const pluginToSettingsMap: { [key: string]: string } = {
      Zapier: "/settings/zapier",
    };
    return pluginToSettingsMap[pluginName];
  }

  return (
    <div className="settings-page">
      <div className="container">
        <h1>Settings</h1>
        <List subheader={<ListSubheader>Plugins</ListSubheader>}>
          {_.map(plugins, (pluginState, pluginName) => {
            const settingsRoute = getSettingsRouteForPluginName(pluginName);

            return (
              <ListItem key={`${pluginName}-${revision}`}>
                <Checkbox
                  edge="start"
                  checked={pluginState}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": pluginName }}
                  onClick={handleTogglePlugin.bind(this, pluginName)}
                />
                <ListItemText primary={pluginName} />
                {settingsRoute ? (
                  <ListItemIcon>
                    <Link to={getSettingsRouteForPluginName(pluginName)}>
                      <IconButton>
                        <Settings />
                      </IconButton>
                    </Link>
                  </ListItemIcon>
                ) : null}
              </ListItem>
            );
          })}
        </List>
      </div>
    </div>
  );
};
