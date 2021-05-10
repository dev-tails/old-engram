//
//  LoginView.swift
//  engram-watch WatchKit Extension
//
//  Created by Adam Berg on 2021-04-16.
//

import SwiftUI

struct LoginView: View {
    @State private var username: String = ""
    @State private var password: String = ""
    
    @ObservedObject var manager = HttpAuth()

    let onSubmit: () -> Void
    
    func handleSubmit() {
        manager.postAuth(username: username, password: password)
    }
    
    var body: some View {
        VStack {
            if (manager.errorMessage != "") {
                Text(manager.errorMessage)
            }
            if (manager.authenticated) {
                Text("Authenticated")
            }
            TextField("Username", text: $username)
                    .textContentType(.username)
                    .multilineTextAlignment(.center)
                    
            SecureField("Password", text: $password)
                    .textContentType(.password)
                    .multilineTextAlignment(.center)
            Button("Log In") {
                handleSubmit();
            }.disabled(username.isEmpty || password.isEmpty)
        }
    }
}
