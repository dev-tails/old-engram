import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { useState } from 'react';

type ShareLinkDialogProps = {
  id?: string;
  open: boolean;
  initialPermissions?: Permission[];
  onClose: () => void;
  onSubmit: (permissions: Permission[]) => void;
};

type Role = "r" | "w";

export type Permission = {
  email: string;
  role: "r" | "w";
};

export const ShareLinkDialog: React.FC<ShareLinkDialogProps> = ({
  id,
  open,
  initialPermissions,
  onClose,
  onSubmit,
}) => {
  const [copyText, setCopyText] = useState("Copy");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("r");
  const [permissions, setPermissions] = useState<Permission[]>(
    initialPermissions || []
  );

  function handleRoleChanged(event: React.ChangeEvent<{ value: unknown }>) {
    setRole(event.target.value as Role);
  }

  function handleAddClicked() {
    setPermissions([{ role, email }, ...permissions]);
    setEmail("");
  }

  function handleEmailChanged(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handleDeletePermissionClicked(permission: Permission) {
    const permissionsCopy = [...permissions];
    const index = permissions.findIndex((p) => p.email === permission.email);
    if (index >= 0) {
      permissionsCopy.splice(index, 1);
      setPermissions(permissionsCopy);
    }
  }

  function handleSaveClicked() {
    onSubmit(permissions);
  }

  function getLink() {
    return `https://engram.xyzdigital.com/notes/${id}`;
  }

  function handleCopyClicked() {
    navigator.clipboard.writeText(getLink());
    setCopyText("Copied");
    setTimeout(() => {
      setCopyText("Copy");
    }, 2000);
  }

  return (
    <div className="share-link-dialog">
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle id="form-dialog-title">Link Sharing Settings</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="link"
            fullWidth
            disabled
            value={getLink()}
            InputProps={{
              endAdornment: (
                <Button onClick={handleCopyClicked}>{copyText}</Button>
              ),
            }}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={handleEmailChanged}
            InputProps={{
              startAdornment: (
                <Select
                  value={role}
                  onChange={handleRoleChanged}
                  disableUnderline={true}
                >
                  <MenuItem value="r">Read</MenuItem>
                  {/* <MenuItem value="w">Write</MenuItem> */}
                </Select>
              ),
              endAdornment: <Button onClick={handleAddClicked}>Add</Button>,
            }}
          />
          <List>
            {permissions.map((permission) => {
              return (
                <ListItem>
                  <ListItemText>{permission.email}</ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={handleDeletePermissionClicked.bind(
                        this,
                        permission
                      )}
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSaveClicked}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
