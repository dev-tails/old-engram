//
//  LoginScreen.swift
//  engram
//
//  Created by Adam Berg on 2021-06-20.
//

import SwiftUI

struct LoginScreen: View {
    @ObservedObject var vm = sharedLoginViewModel
    
    @State var email: String = ""
    @State var password: String = ""
    
    func handleSubmit() {
        vm.login(email: email, password: password)
    }
    
    var body: some View {
        VStack {
            TextField("Email", text: $email)
                .textContentType(.emailAddress)
            SecureField("Password", text: $password)
                .textContentType(.password)
            Button("Login", action: handleSubmit)
        }.frame(width: 256)
    }
}

struct LoginScreen_Previews: PreviewProvider {
    static var previews: some View {
        LoginScreen()
    }
}
