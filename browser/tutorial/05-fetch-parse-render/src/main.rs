use gtk::prelude::*;
use gtk::gdk::Display;
use gtk::{Application, ApplicationWindow, CssProvider, Orientation, StyleContext, STYLE_PROVIDER_PRIORITY_APPLICATION, 
             ScrolledWindow, TextView, TextBuffer, WrapMode};

const APP_ID: &str = "xyz.engramhq.browser";

fn main() -> Result<(), Box<dyn std::error::Error>> {
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

    Ok(())
}

fn build_ui(app: &Application) -> Result<(), Box<dyn std::error::Error>> {
    let body = gtk::Box::builder()
        .orientation(Orientation::Vertical)
        .css_name("body")
        .build();

    let html = ScrolledWindow::builder()
        .child(&body)
        .build();

    let res = reqwest::blocking::get("https://devtails.xyz/3-lines-of-code-shouldnt-take-all-day")?;

    let content = res.text()?;
    let document = scraper::Html::parse_fragment(&content);
    let selector = scraper::Selector::parse("h1, h2, h3, h4, h5, h6, p").unwrap();

    for el in document.select(&selector) {
        let mut full_text = String::new();
        for text in el.text() {
            full_text = format!("{}{}", &full_text, &text);
        }

        if full_text == "" {
            continue;
        }

        let text_buffer = TextBuffer::builder()
            .text(&full_text)
            .build();

        let text_view = TextView::builder()
            .buffer(&text_buffer)
            .css_name(el.value().name())
            .editable(false)
            .cursor_visible(false)
            .wrap_mode(WrapMode::Word)
            .build();
            
        body.append(&text_view);
    }

    let window = ApplicationWindow::builder()
        .application(app)
        .title("Browser")
        .child(&html)
        .default_height(720)
        .default_width(1280)
        .build();

    window.present();

    Ok(())
}