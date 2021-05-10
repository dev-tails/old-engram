//
//  engram_watchApp.swift
//  engram-watch WatchKit Extension
//
//  Created by Adam Berg on 2021-04-16.
//

import SwiftUI

@main
struct engram_watchApp: App {
    @State private var selection: String? = nil
    
    func handleLoggedIn() {
        selection = "main"
    }

    var body: some Scene {
        WindowGroup {
            NavigationView {
                VStack {
                    NavigationLink(
                        destination: LoginView(onSubmit: handleLoggedIn),
                        tag: "login",
                        selection: $selection
                    ) {
                        Text("Login")
                    }
                    NavigationLink(destination: ContentView().navigationBarTitle("engram"), tag: "main", selection: $selection) {
                        Text("Notes")
                    }
                }
            }
        }
    }
}
