# Fetching HTML Using the reqwest library

## Install reqwest

```
cargo add reqwest --features blocking
```

The above command will update the `Cargo.toml` to something like below:

```diff
# Cargo.toml
[package]
name = "browser"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
+ reqwest = { version = "0.11.11", features = ["blocking"] }
```

## Add Code to Make Blocking HTTP GET Request

```rust
fn main() -> Result<(), Box<dyn std::error::Error>> {
    let res = reqwest::blocking::get("https://devtails.xyz/3-lines-of-code-shouldnt-take-all-day")?;

    println!("{}", res.text()?);

    Ok(())
}
```

# Resources

https://github.com/seanmonstar/reqwest/tree/master/examples
https://docs.rs/reqwest/latest/reqwest/
https://rust-lang-nursery.github.io/rust-cookbook/web/clients/requests.html