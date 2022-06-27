use gtk::prelude::*;
use gtk::gdk::Display;
use gtk::{Application, ApplicationWindow, CssProvider, StyleContext, STYLE_PROVIDER_PRIORITY_APPLICATION, TextView, TextBuffer};

const APP_ID: &str = "com.xyzdigital.engram.browser";

fn main() {
    let app = Application::builder().application_id(APP_ID).build();

    app.connect_startup(|app| {
        let provider = CssProvider::new();
        provider.load_from_data(include_bytes!("style.css"));

        StyleContext::add_provider_for_display(
            &Display::default().expect("Could not connect to a display."),
            &provider,
            STYLE_PROVIDER_PRIORITY_APPLICATION,
        );

        build_ui(app);
    });

    app.run();
}

fn build_ui(app: &Application) {
    let text_buffer = TextBuffer::builder()
        .text("Hello World")
        .build();
    
    let text_view = TextView::builder()
        .buffer(&text_buffer)
        .css_name("h1")
        .editable(false)
        .cursor_visible(false)
        .build();

    let window = ApplicationWindow::builder()
        .application(app)
        .title("Browser")
        .child(&text_view)
        .default_height(720)
        .default_width(1280)
        .build();


    window.present();
}