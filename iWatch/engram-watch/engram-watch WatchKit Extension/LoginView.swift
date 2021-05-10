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

    let onSubmit: () -> Void
    
    var body: some View {
        VStack {
            TextField("Username", text: $username)
                    .textContentType(.username)
                    .multilineTextAlignment(.center)
            SecureField("Password", text: $password)
                    .textContentType(.password)
                    .multilineTextAlignment(.center)
            Button("Log In") {
                onSubmit();
            }.disabled(username.isEmpty || password.isEmpty)
        }
    }
}
