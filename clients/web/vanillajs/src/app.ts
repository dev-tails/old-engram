import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

(window as any).initDb = async function(SQL) {
  try {
    const result = await Filesystem.readFile({
      path: 'engram.db',
      directory: Directory.Documents,
      encoding: Encoding.UTF8
    })

    const dataAsIntArray = new TextEncoder().encode(result.data);
    return new SQL.Database(dataAsIntArray);
  } catch(e) {
    console.error('Unable to read file', e);
  }

  return new SQL.Database();
};

(window as any).exportDb = async function(db) {
  var exportAsString = new TextDecoder().decode(db.export());

  try {
    const result = await Filesystem.writeFile({
      path: 'engram.db',
      data: exportAsString,
      directory: Directory.Documents,
      encoding: Encoding.UTF8
    })
    console.log('Wrote file', result);
  } catch(e) {
    console.error('Unable to write file', e);
  }
};