use std::io;
use std::collections::HashMap;
use chrono::{Local};
use serde::{Serialize, Deserialize};
use confy;

#[derive(Debug, Serialize, Deserialize, Default)]
struct EngramConfig {
    username: String,
    password: String,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut cfg: EngramConfig = confy::load("engram")?;
    let stdin = io::stdin();

    if cfg.username == "" {
      println!("Username?");
      let mut username = String::new();
      stdin.read_line(&mut username)?;

      cfg.username = username.trim().to_string();
      confy::store("engram", &cfg);
    }
    if cfg.password == "" {
      println!("Password?");
      let mut password = String::new();
      stdin.read_line(&mut password)?;

      cfg.password = password.trim().to_string();
      confy::store("engram", &cfg);
    }
    
    let mut login_post_map = HashMap::new();
    login_post_map.insert("username", cfg.username);
    login_post_map.insert("password", cfg.password);

    let client = reqwest::Client::builder()
        .cookie_store(true).build().unwrap();
    let resp = client.post("https://engram.xyzdigital.com/api/users/login")
        .json(&login_post_map)
        .send()
        .await?;
    if resp.status() != 200 {
      println!("failed to log in");
      return Ok(());
    }

    let mut running = true;
    while running == true {
      let mut buffer = String::new();
      stdin.read_line(&mut buffer)?;
      if buffer.trim() == "" {
        running = false;
      } else {
        let mut note_post_map = HashMap::new();
        let date_string = Local::today().format("%Y-%m-%d").to_string();

        note_post_map.insert("date", date_string);
        note_post_map.insert("body", buffer);

        let create_note_res = client.post("https://engram.xyzdigital.com/api/notes")
            .json(&note_post_map)
            .send()
            .await?;

        if create_note_res.status() != 200 {
          println!("failed to save note");
        }
      }
    }
    Ok(())
}
