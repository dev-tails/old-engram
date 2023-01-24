Let's Build a Note Taking Command Line Application With Rust

I wrote about my first Rust application last week. After making it through some of the initial syntax hurdles, I'm feeling good about the language.  This post is the first of a series of posts that will cover how to build a note taking application with Rust. The content expects the reader to have some existing programming knowledge, but can be completely new to Rust. Each part of the series will result in a functional and useful application that will be built upon in future posts.  

A software application is usually built from all the same stuff. One foundational concept is CRUD (Create, Read, Update, and Delete). Each of these terms identifies a central piece of functionality that will be required for essentially all applications.  In our case, the "item" we will be dealing with is a "note". 


## Getting Started

Install rust with the command below found from their [Getting started page](https://www.rust-lang.org/learn/get-started)

### Install Rust

```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### Create New Rust Project


```
cargo new notes
```

This will create a new project (and folder) called "notes". It will have a very basic main function that you can start working off of.

### [Optional] Install DB Browser for SQLite

https://sqlitebrowser.org/

## Preparing the Data Model

### Creating an sqlite3 Database

A database is the centerpiece of pretty much any application. Most new functionality requires storing some new piece of data or retrieving existing information in some way. For these reasons, this is often the first thing you should be thinking about when building something new.  Particuarly, what is the "schema" of what I am trying to build.

For the purposes of this tutorial, our schema is very simple. We want a `notes` table that has an `id` column and a `body` column.  `id` stores a unique identifier for the specific note.  This is a required field by most databases as it allows you to directly reference an existing item. The `body` column will store the content of the note that we are saving.  You're welcome to choose some other term here that feels better to you.  Some possible alternatives: `content`, `message`, `text`, or `title`.  It is certainly possible to change this after the fact, but it become increasingly difficult as time moves along and more code references these specific terms, so try to pick one you can live with and stick to it.

Most tutorials I see nowadays are primarily concerned with storing data on a server and syncing it via some kind of API. This series will eventually get there, but it is beyond important that a notes application like the one we are building works offline.  Placing this restriction early on allows us to build with offline in mind - rather than attempting to bolt it on to an existing cloud application.

sqlite3 is a popular database library that stores the database in a single file on the filesystem. This keeps things simple for the user as they don't need to run a separate database server and the database file can be passed along to other systems if needed.

### Creating a notes Table

The first step is to create a table that will house our applications data.  We will use the `rusqlite` library to handle our connection to the sqlite database.  You can install it by modifying your `Cargo.toml`.

```
...
[dependencies]
rusqlite = "0.26.1"
```

Once that has been added you can now access the `rusqlite` in your `Main.rs`

```
use rusqlite::{Connection, Result};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let conn = Connection::open("notes.db")?;

    conn.execute(
        "create table if not exists notes (
             id integer primary key,
             body text not null unique
         )",
        [],
    )?;

    Ok(())
}
```

Now you can run `cargo run` and once it builds it will run and immediately exit.  You should then see a file in your current directory called `notes.db`.  If you installed the DB Browser, you can open up this file and see that a `notes` table exists with an `id` and `body` column.

If you run the program again, nothing should happen. The SQL command we are running:

```
create table if not exists notes (
    id integer primary key,
    body text not null unique
)
```

Specifies to only create the table if it doesn't already exist. When we open the connection with `let conn = Connection::open("notes.db")?;` we point the `rusqlite` library to the same database file and it is able to determine that this table has already been created.

Now that we have a table created and our schema set up, we can proceed with adding our first note.

## CRUD

When developing new functionality, I typically work on each component of the CRUD acronym independently.  The order that makes the most sense to me to build is:

1. Create
2. Read
3. Delete
4. Update

## Create

Create comes first because without it none of the others make sense.  In a lot of scenarios, you application becomes functional as soon as creating is possible.  You obviously would like the ability to do the others, but their absence does not impair you from creating new items. In our notes example, you'll see that even if you just added the create functionality, you still have a program that correctly stores notes to a local database.  If that's all you were able to accomplish, you could still open the sqlite3 databse using something like DB Browser for SQLite and browse old notes there.  

In our small example here, there's not much to the rest of CRUD, but when building a larger graphical user interface, it can be useful to demo and test just the create functionality.  You might realize that you want it to work or look differently and catching this here will save you time.

### Requirements

For the creation of notes, I simply want to be able to type my note into the terminal and hit enter.  In order to gather input from the command line we will use the built in `std::io` package.

```
...
let mut buffer = String::new();
io::stdin().read_line(&mut buffer)?;

conn.execute("INSERT INTO notes (body) values (?1)", [buffer])?;
...
```

We can again run our application with `cargo run` and you should now see that it doesn't immediately exit.  You can type in any message you like, but "hello world" is the standard "is this thing working" message.

Once you hit enter, the program should exit. If you open up your database in DB Browser, you'll see a single row with `id:` 1 and `body:` "hello world" (or whatever you just typed).

![DB Browser Screenshot With First Note]()

This is pretty good, but the purpose of the program is to allow us to quickly capture many notes. We need some way to make it so the program doesn't exit right away after the first note is submitted.

To accomplish this, we will use a `loop` - specifically a `while` loop.  

```
    let mut running = true;
    while running == true {
        let mut buffer = String::new();
        io::stdin().read_line(&mut buffer)?;

        let trimmed_body = buffer.trim();

        if trimmed_body == "" {
            running = false;
        } else {
            conn.execute("INSERT INTO notes (body) values (?1)", [trimmed_body])?;
        }
    }
```

To accomplish this, we introduce a `boolean` variable called `running`. When we start the program we want to continue accepting input so we initialize to `true`.  

The `let trimmed_body = buffer.trim();` removes any whitespace at the end of the input line.  This is necessary because the `read_line` returns the string with the new line character `\n`. This is invisible most places, but is needed to make the `trimmed_body == ""` equality check work. As an additional benefit, the `.trim()` ensures that any trailing white space gets removed before we store to the databse.

We can now run again with `cargo run` and you should now be able to enter note after note without the program exiting. Once you have finished writing notes you can press enter with a blank line and the program will exit.

## Read

The next logical step is adding the ability to read whatever has just been created. In a command line application, the options here are much more limited which allows us to skip discussing all kinds of Graphical User Interface (GUI) related topics.  This doesn't necessarily make it simple though.

There are some considerations for how this might work in our application. Namely how do we want to trigger and display historical notes to the user. 

### Triggers or Commands

The notes application will continue running after started until an empty string is submitted. In order to query for some kind of information, we need to invent some functionality that allows the user to differentiate between a simple note and a more advanced command.

To accomplish this, we will implement "slash commands".  These have been popularized by the likes of Slack and Notion and should work well for what we need.  If a note is started with a "/", the text that follows will be interpreted as a command.  More spcecifically for the reading of notes, we will add a "/list" command.  To keep things simple, it will dump all notes that are in the database.  We will follow up on this in a later post to improve how this works. Every new piece of functionality has many more considerations than you first realize, so delaying certain things prevents you from getting hung up on details that don't matter yet.

### /list

```
    let mut running = true;
    while running == true {
        let mut buffer = String::new();
        io::stdin().read_line(&mut buffer)?;

        let trimmed_body = buffer.trim();
        if trimmed_body == "" {
            running = false;
        } 
        else if trimmed_body == "/list" {
            let mut stmt = conn.prepare("SELECT id, body from notes")?;
            let mut rows = stmt.query(rusqlite::params![])?;
            while let Some(row) = rows.next()? {
                let id: i32 = row.get(0)?;
                let body: String = row.get(1)?;
                println!("{} {}", id, body.to_string());
            }
        }
        else {
            conn.execute("INSERT INTO notes (body) values (?1)", [trimmed_body])?;
        }
    }
```

Whenever a note is submitted, we check to see if "/list" was entered. If it was, we proceed into that `else if` block to print out existing notes.

`let mut stmt = conn.prepare("SELECT id, body from notes")?;`

This prepares and SQL statement using the connection we initialized at the start of our main function.  `SELECT id, body from notes` specifies that we want to return the id and body columns from the notes table.

`let mut rows = stmt.query(rusqlite::params![])?;`

We then issue the `query` method on the prepared statement. Since we are selecting all notes there are no params which is why we pass empty params using: `rusqlite::params![]`.

```
while let Some(row) = rows.next()? {
    let id: i32 = row.get(0)?;
    let body: String = row.get(1)?;
    println!("{} {}", id, body.to_string());
}
```

The above code iterated through all of the returned rows. Each row will be a note that has previously been entered in to our database.  `row.get(0)` and `row.get(1)` fetch the value of the associated column index.  In our case, our query specified: `SELECT id, body from notes` which means id will be at index 0 and body will be at index 1.

Rust cannot infer the types of these properties, which is why they must be specified as `let id: i32 = row.get(0)?;` and `let body: String = row.get(1)?;`.  With `i32` identifying that id is a 32 bit integer and `String` identifying that body is a string.

Finally we pass both of these along to the `println` function in order to output them back to the terminal.

Once again, you can now run the app with `cargo run` and if you issue a `/list` command, you should now see all of the notes you have submitted printed back at you.

[Screenshot of terminal with notes]()

## Delete

I almost always implement deleting before updating. It's a simple operation which makes it very quick.  But it can also act as a makeshift way to edit items.  In our notes example, if I want to edit a note, I could first delete it and then create a new one with the correct body.  As mentioned above, this seems less practical in a small example like this, but in a larger application, the edit GUI can be surprisingly complex.  

```
...
let trimmed_body = buffer.trim();
let cmd_split = trimmed_body.split_once(" ");

let mut cmd = trimmed_body;
let mut msg = "";
if cmd_split != None {
    cmd = cmd_split.unwrap().0;
    msg = cmd_split.unwrap().1;
}

if cmd == "/del" {
    let id = msg;
    conn.execute("delete from notes where id = (?1)", [id])?;
}
...
```

The `/del` command has something the `/list` command doesn't - an additional parameter. We need to specify which note we want to delete. After thinking about it for a moment, I decided I'd like to pass `/del 1` to delete the note with id 1.

In order to differentiate between the "command" and the "parameter", I decided to use the `split_once` method. 


`let cmd_split = trimmed_body.split_once(" ");`

The `split_once` method splits a string based on the passed delimiter.  In our example "/del 1" would return as `Some(("/del", "1"))`. I then proceed to unwrap those values and store them in `cmd` and `msg` variables. 

`if cmd_split != None {`

This equality check covers the case where there are no spaces.  In this condition the `split_once` method returns None to identify that the " " delimiter doesn't exist.

I'm still new to Rust and found this a bit clunky.  I suspect there's probably a better way to write this, but for now it does the job. I've learned many times to not get hung up on small details as this one alone could lead to a 30 minute rabbit hole down Rust documentation. If you have any recommendations, feel free to share them in the comments section.

```
if cmd == "/del" {
    let id = msg;
    conn.execute("delete from notes where id = (?1)", [id])?;
}
```

We now check that the first part of the entered text was `/del` and if so, we know that we can get the id to delete from the `msg` variable.

`"delete from notes where id = (?1)", [id]`

This is the SQL command to delete a row from the notes table that matches the id specified.  

Once again, you can run `cargo run` and now try `/del 1` which should delete the first message you created.  You can confirm it worked by running `/list` and you should no longer see a note with index 1.

![Screenshot of notes without id 1]()

## Update

There are a few options for how the update can work.  To continue to keep things simple, I decided that the edit should be issued all as one command. `/edit 1 the new body I want to have`. Similar to the delete, an `id` is passed to identify which note to edit.  Everything following the `id` is then treated as the new body to overwrite the existing one.

```
else if cmd == "/edit" {
    let msg_split = msg.split_once(" ").unwrap();
    let id = msg_split.0;
    let body = msg_split.1;

    conn.execute("update notes set body = (?1) where id = (?2)", [body, id])?;
}
```

The `/edit` command starts similar to the `/del`.  The main difference is we need to again split the `msg` by a white space.  Using the `split_once` only splits on the first white space, which allows the body to remain intact.

`"update notes set body = (?1) where id = (?2)", [body, id]`

This update command specifies that we will set the `body` column to what we've parsed from the input on any rows that have an `id` that matches the `id` specified.  

`(?1)` and `(?2)`

These denote positional parameters.  All of our previous SQL statements had only one, but in this case there are two.  `(?1)` will be replaced by the first entry in the supplied parameters `[body, id]` (or `body` in this case). `(?2)` will be replaced by the `id` variable.

Fire this up one more time and try editing one of your existing notes.  You can see previous ones with the `/list` command, then issue and `/edit` command, and finally issue another `/list` command to confirm the note was correctly modified. 

## Installing Your Notes Application

```
cargo install --path .
```

Running the above will compile the rust applciation and add it to your system path.  If you used the `cargo new notes` command at the start, you should now have access to the `notes` command from your terminal.  If you would like to update the name of your executable, you can modify the `name` property in the `Cargo.toml` file to match whatever you prefer. 

I have been working on a notes application for a while called `engram` and to keep my executable name short, I've shorted this to `eg`.  Now anytime I am in the terminal I can type `eg` and have immediate access to my notes.

## Wrap-up

If you followed along through this whole tutorial, you should now have a functional notes app written in Rust accessible from a terminal.  In the next post we will add some additional functionality to the app and start organizing the code. Follow to get updates when new parts are available or comment with what you'd like to see next.