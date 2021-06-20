//
//  LoginScreen.swift
//  engram
//
//  Created by Adam Berg on 2021-06-20.
//

import SwiftUI

struct LoginScreen: View {
    @ObservedObject var vm = sharedLoginViewModel
    
    @State var showingAlert = false
    
    @State var email: String = ""
    @State var password: String = ""
    
    func handleLogin() {
        vm.login(email: email, password: password)
    }
    
    func handleSignup() {
        vm.signup(email: email, password: password)
    }
    
    var body: some View {
        VStack {
            TextField("Email", text: $email)
                .textContentType(.emailAddress)
            SecureField("Password", text: $password)
                .textContentType(.password)
            HStack {
                Button("Sign Up", action: handleSignup)
                    .alert(isPresented: $vm.hasSignupError) {
                        Alert(
                            title: Text("Error"),
                            message: Text(vm.signupError)
                        )
                    }
                Spacer()
                Button("Login", action: handleLogin)
                    .alert(isPresented: $vm.hasLoginError) {
                        Alert(
                            title: Text("Error"),
                            message: Text(vm.loginError)
                        )
                    }
            }
            
        }.frame(width: 256)
    }
}

struct LoginScreen_Previews: PreviewProvider {
    static var previews: some View {
        LoginScreen()
    }
}
