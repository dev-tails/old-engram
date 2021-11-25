use std::io;
use rusqlite::{Connection, Result};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let conn = Connection::open("engram.db")?;

    conn.execute(
        "create table if not exists notes (
             id integer primary key,
             body text not null unique
         )",
        [],
    )?;

    let mut running = true;
    while running == true {
      let mut buffer = String::new();
      io::stdin().read_line(&mut buffer)?;

      let trimmed_body = buffer.trim();
      let cmd_split = trimmed_body.split_once(" ");

      let mut cmd = trimmed_body;
      let mut msg = "";
      if cmd_split != None {
        cmd = cmd_split.unwrap().0;
        msg = cmd_split.unwrap().1;
      }
      
      if cmd == "/list" {
        let mut stmt = conn.prepare("SELECT id, body from notes")?;
        let mut rows = stmt.query(rusqlite::params![])?;
        while let Some(row) = rows.next()? {
          let id: i32 = row.get(0)?;
          let body: String = row.get(1)?;
          println!("{} {}", id, body.to_string());
        }
      } else if cmd == "/del" {
        let id = msg;
        conn.execute("delete from notes where id = (?1)", [id])?;
      } else if cmd == "/edit" {
        let msg_split = msg.split_once(" ").unwrap();
        let id = msg_split.0;
        let body = msg_split.1;

        conn.execute("update notes set body = (?1) where id = (?2)", [body, id])?;
      } else if cmd == "" {
        running = false;
      } else {
        conn.execute("INSERT INTO notes (body) values (?1)", [trimmed_body])?;
      }
    }

    Ok(())
}