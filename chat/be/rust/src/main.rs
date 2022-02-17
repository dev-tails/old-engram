use mongodb::{Client, options::ClientOptions};
use futures::stream::TryStreamExt;
use mongodb::{bson::doc, options::FindOptions};
use serde::{Deserialize, Serialize};
use mongodb::bson::oid::ObjectId;
use rocket::serde::{json::Json};



#[macro_use] extern crate rocket;

#[derive(Clone, Serialize, Deserialize, PartialEq, Debug)]
struct Room {
    // #[serde(rename = "_id")]
    // id: ObjectId,
    title: String
}

#[get("/1")]
async fn room() -> Json<Room> {
    return Json(Room {
        title: "Hello".to_string()
    })
}

#[get("/")]
async fn rooms() -> Option<String> {
    let mut client_options = ClientOptions::parse("mongodb://localhost:27017").await.ok()?;
    let client = Client::with_options(client_options).ok()?;
    let db = client.database("chat");
    let typed_collection = db.collection::<Room>("rooms");

    let filter = doc! { };
    let find_options = FindOptions::builder().build();
    let mut cursor = typed_collection.find(filter, find_options).await.ok()?;

    let mut rooms : Vec<Room> = vec![];

    // Iterate over the results of the cursor.
    while let Some(room) = cursor.try_next().await.ok()? {
        rooms.push(room);
    }
    return Some("Hello, world!".to_string())
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/api/rooms", routes![room, rooms])
}