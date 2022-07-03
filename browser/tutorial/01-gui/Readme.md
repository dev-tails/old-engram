# Simple GUI with Rust and GTK

## Add gtk to Cargo.toml

```diff
# Cargo.toml
[package]
name = "browser"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
+ gtk = { version = "0.4.8", package = "gtk4" }
```

## Add a Simple GTK TextView 

```rust
// src/main.rs
use gtk::prelude::*;
use gtk::{Application, ApplicationWindow, TextView, TextBuffer};

const APP_ID: &str = "xyz.engramhq.browser";

fn main() {
    let app = Application::builder().application_id(APP_ID).build();

    app.connect_startup(|app| {
        build_ui(app);
    });

    app.run();
}

fn build_ui(app: &Application) {
    let h1_text_buffer = TextBuffer::builder()
        .text("Hello World")
        .build();
    
    let h1 = TextView::builder()
        .buffer(&h1_text_buffer)
        .editable(false)
        .cursor_visible(false)
        .build();

    let window = ApplicationWindow::builder()
        .application(app)
        .title("Browser")
        .child(&h1)
        .default_height(720)
        .default_width(1280)
        .build();


    window.present();
}
```

## Breaking Down the 