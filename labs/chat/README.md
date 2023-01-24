# engram chat

## Development Setup

### be

The be for chat was developed before the central engram api was started.  In order to bridge the gap for now you can set the `.env` file to the below when developing locally.  This allows it to eventually be replaced with the api as it points the user login to the user database.

```
USER_DB_URL=mongodb://localhost:27017/engram
DB_URL=mongodb://localhost:27017/engram
```

Once that is set simply run `node server.js` from the `be` folder.  The app will then be running on http://localhost:1337.

### fe

Currently the `be/server.js` serves up the static files for simplicity.  In order to bundle the fe app, simply run `yarn build`.  This outputs `fe/public/js/app.js`.  If you will be actively making changes you can run `yarn build --watch` and have esbuild automatically rebuild when a file is changed.

## Contributing

For now, tasks related to chat are managed on the [Chat Project on Github](https://github.com/adamjberg/engram/projects/6).  If something is in the To do column feel free to pick it up.  At this stage requirements are intentionally very slim.  As long as the functionality works, that's good enough.  Once you have made a change create a Pull Request and it will be reviewed within a day or so.  In the interest of time, sometimes I may make changes directly to a PR rather than requesting changes to reduce the amount of back and forth.
