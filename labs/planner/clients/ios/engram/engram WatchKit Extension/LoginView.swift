//
//  LoginView.swift
//  engram WatchKit Extension
//
//  Created by Adam Berg on 2021-06-21.
//

import SwiftUI

struct LoginView: View {
    @ObservedObject var vm = sharedLoginViewModel
    
    func handleLogin() {
        vm.login()
    }
    
    func handleSignup() {
        vm.signup()
    }
    
    var body: some View {
        VStack {
            TextField("Email", text: $vm.email)
                .textContentType(.emailAddress)
            SecureField("Password", text: $vm.password)
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
        }
    }
}

struct LoginView_Previews: PreviewProvider {
    static var previews: some View {
        LoginView()
    }
}
