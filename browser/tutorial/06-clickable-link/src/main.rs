use gtk::prelude::*;
use gtk::{Application, ApplicationWindow, LinkButton};

const APP_ID: &str = "xyz.engramhq.browser";

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let app = Application::builder().application_id(APP_ID).build();

    app.connect_startup(|app| {
        build_ui(app);
    });

    app.run();

    Ok(())
}

fn build_ui(app: &Application) -> Result<(), Box<dyn std::error::Error>> {
    let button = LinkButton::builder()
        .label("3 Lines of Code Shouldn't Take All Day")
        // This doesn't work on macos
        .uri("https://devtails.xyz/3-lines-of-code-shouldnt-take-all-day")
        .build();

    button.connect_clicked(move |button| {
        button.set_label("Hello World!");
    });

    let window = ApplicationWindow::builder()
        .application(app)
        .title("Browser")
        .child(&button)
        .default_height(720)
        .default_width(1280)
        .build();

    window.present();

    Ok(())
}