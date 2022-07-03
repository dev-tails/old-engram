use scraper::{Html};

fn main() {
    let document = Html::parse_fragment("<h1>Hello World</h1><p>This is the first paragraph</p>");

    let iter = document.root_element().tree().clone().into_iter();

    for node in iter {
        if let Some(el) = node.as_element() {
            println!("{}", el.name());
        }
        if let Some(t) = node.as_text() {
            println!("{}", t.text)
        }
    }
}
