use gtk::*;
pub struct Header {
    pub container: HeaderBar,
    pub hello_btn: Button,
}

impl Header {
    pub fn new() -> Header {
        let container = HeaderBar::new();
        container.set_show_close_button(true);
        container.set_title("Hello Rust!");
        let hello_btn = Button::new_with_label("Hello!");
        container.pack_start(&hello_btn);
        //add "hello-btn" class
        hello_btn
            .get_style_context()
            .map(|c| c.add_class("hello-btn"));
        Header {
            container,
            hello_btn,
        }
    }
}
