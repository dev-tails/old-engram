use gtk::prelude::*;
use gtk::gdk::Display;
use gtk::{Application, ApplicationWindow, CssProvider, Orientation, StyleContext, STYLE_PROVIDER_PRIORITY_APPLICATION, TextView, TextBuffer, Box};

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
    let body = Box::builder()
        .orientation(Orientation::Vertical)
        .css_name("body")
        .build();

    let h1_text_buffer = TextBuffer::builder()
        .text("Hello World")
        .build();
    
    let h1 = TextView::builder()
        .buffer(&h1_text_buffer)
        .css_name("h1")
        .editable(false)
        .cursor_visible(false)
        .build();
    
    body.append(&h1);

    let p_text_buffer = TextBuffer::builder()
        .text("This is a tiny blog post to demonstrate that this is already a moderately functional browser.")
        .build();

    let p = TextView::builder()
        .buffer(&p_text_buffer)
        .css_name("p")
        .editable(false)
        .cursor_visible(false)
        .build();
    
    body.append(&p);

    let p2_text_buffer = TextBuffer::builder()
        .text("Once it works")
        .build();

    let p2 = TextView::builder()
        .buffer(&p_text_buffer)
        .css_name("p")
        .editable(false)
        .cursor_visible(false)
        .build();
    
    body.append(&p2);

    let window = ApplicationWindow::builder()
        .application(app)
        .title("Browser")
        .child(&body)
        .css_name("html")
        .default_height(720)
        .default_width(1280)
        .build();


    window.present();
}