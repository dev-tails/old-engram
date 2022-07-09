fn main() -> Result<(), Box<dyn std::error::Error>> {
    let res = reqwest::blocking::get("https://devtails.xyz/3-lines-of-code-shouldnt-take-all-day")?;

    let content = res.text()?;
    let document = scraper::Html::parse_fragment(&content);
    let selector = scraper::Selector::parse("h1, p").unwrap();

    for el in document.select(&selector) {
        let mut full_text = String::new();
        for text in el.text() {
            full_text = format!("{}{}", &full_text, &text);
        }   
        println!("{}", &full_text);
    }

    Ok(())
}