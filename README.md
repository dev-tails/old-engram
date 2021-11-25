<p align="center">
  <img src="fe/public/logo512.png" alt="engram logo" height="256px"/>
</p>

<h1 align="center">engram</h1>

> a hypothetical permanent change in the brain accounting for the existence of memory; a memory trace.

An open source application for quickly gathering thoughts.

## Mission

Help educate others (and myself) on how to build software applications. 

The core functionality of engram is simply the ability to capture and store text. This has become my defacto "Hello World" application when testing out a new language, library, or framework. Once I feel I have enough knowledge with a specific technology, that code will find it's way into this repository.

## Folder Structure

To support this mission, the folder structure is organized to separate the app into major areas.

### api

The backend is currently a [REST api](https://restfulapi.net/) built with [Node.js](https://nodejs.org) on top of the [express](https://expressjs.com/) web framework. I've spent very little energy in this realm, focusing significantly more on frontend clients for now.  In the future, I will add new languages and frameworks here.

### clients

There are several frontend clients available for engram.  Each one may have slightly different functionality based on how far along that project is, or whether the target platform has additional functionality. This helps showcase when it's useful to specifically target a platform vs. building something generic.

#### [React](clients/web/react)

This is the original engram client.  This is the technology stack I have the most comfort with, which is why I started here. This client powers the offical [engram web app](https://engram.xyzdigital.com/).

#### [react-native](clients/react-native)

This is a [react-native](https://reactnative.dev/) app built using [expo](https://expo.dev/). This is the build used for the [Offical Google Play app](https://play.google.com/store/apps/details?id=com.xyzdigital.engram).  The Play Store version will soon be replaced by a native Android application.

#### ios

This is a [Swift 5](https://developer.apple.com/swift/) native iOS application. This is the client used for the [official engram iOS app](https://apps.apple.com/ca/app/engram/id1568952668). 

#### Command Line Interface (CLI)

I knew early on I wanted a CLI for engram. engram is about quickly capturing thoughts, and I can think of no other place that is as quick as the command line. The cli is currently built in [Rust](https://doc.rust-lang.org/book/).

##### eg

`eg` is the online enabled version of the CLI.  It syncs with the web version of engram so anything captured on the command line can be viewed on your other devices.  I wrote an in depth article about the start of this project [here](https://medium.com/geekculture/building-my-first-command-line-interface-cli-with-rust-b6beb9c284e0).

##### ego

`ego` is an offline version of engram. I'm currently using this to learn more about Rust while also writing tutorials about it.  Some of this work may get merged in with eg to make it possible to work offline while eventually syncing items.  I still believe there is a strong enough case for a fully offline version, so `ego` should remain as the place to put information you don't want accessing the Internet.

#### vanillajs

WIP

### admin

WIP

# Resources

- [Introduction](https://engramhq.xyz/2020/11/21/introducing-engram/)
  - [Purpose](https://engramhq.xyz/help/about/philosophy-behind-engram/)
  - [Core engram Concepts](https://engramhq.xyz/help/about/core-engram-concepts/)
  - [FAQs](https://engramhq.xyz/faqs/)
- [Getting started](https://engramhq.xyz/help/#getting-started)
  - [engram in the Browser](https://engramhq.xyz/help/getting-started/engram-in-your-browser/)
  - [Installing engram on Your Devices](https://engramhq.xyz/help/getting-started/install-engram-on-your-devices/)
  - [Setting up Send to engram](https://engramhq.xyz/help/getting-started/how-to-setup-send-to-engram/)

