mod header;
use self::header::Header;
use gtk;
use gtk::*;
use std::process;
const CSS: &str = include_str!("styles/app.css");

pub struct App {
    pub window: Window,
    pub header: Header,
}

impl App {
    pub fn new() -> App {
        if gtk::init().is_err() {
            println!("failed to init GTK");
            process::exit(1);
        }
        let window = Window::new(WindowType::Toplevel);
        let header = Header::new();
        //Add custom CSS
        let screen = window.get_screen().unwrap();
        let style = CssProvider::new();
        let _ = CssProviderExt::load_from_data(&style, CSS.as_bytes());
        StyleContext::add_provider_for_screen(&screen, &style, STYLE_PROVIDER_PRIORITY_USER);
        window.set_default_size(600, 350);
        window.set_titlebar(&header.container);
        window.connect_delete_event(move |_, _| {
            main_quit();
            Inhibit(false)
        });
        //return
        App { window, header }
    }
}
