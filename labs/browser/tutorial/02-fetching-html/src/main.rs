fn main() -> Result<(), Box<dyn std::error::Error>> {
    let res = reqwest::blocking::get("https://devtails.xyz/3-lines-of-code-shouldnt-take-all-day")?;

    println!("{}", res.text()?);

    Ok(())
}