use gtk::prelude::*;
use gtk::gdk::Display;
use gtk::{Application, ApplicationWindow, CssProvider, FlowBox, LinkButton, Orientation, StyleContext, STYLE_PROVIDER_PRIORITY_APPLICATION, 
    ScrolledWindow, TextView, TextBuffer};

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

    let document = scraper::Html::parse_fragment("<p>This is the first paragraph. <a href='https://devtails.xyz'>dev/tails</a> is the website I want to link to</p>");

    let iter = document.root_element().tree().clone().into_iter();

    let mut full_text = String::new();
    for node in iter {
        println!("new node");
        if let Some(el) = node.as_element() {
            println!("el");
            if el.name() == "a" {
                if let Some(href) = el.attr("href") {
                    let button = LinkButton::builder()
                        .label(href)
                        // This doesn't work on macos
                        .uri("https://devtails.xyz/3-lines-of-code-shouldnt-take-all-day")
                        .build();

                body.append(&button);
                }
            }
        }
        if let Some(t) = node.as_text() {
            println!("as_text");
            full_text = format!("{}{}", full_text, t.text);
        }
    }

    let text_buffer = TextBuffer::builder()
                .text(&full_text)
                .build();

            let text_view = TextView::builder()
                .buffer(&text_buffer)
                .editable(false)
                .focusable(false)
                .cursor_visible(false)
                .build();

            body.append(&text_view);

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