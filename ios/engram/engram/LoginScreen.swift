//
//  LoginScreen.swift
//  engram
//
//  Created by Adam Berg on 2021-06-20.
//

import SwiftUI

struct LoginScreen: View {
    @ObservedObject var vm = sharedLoginViewModel
    
    func handleLogin() {
        vm.login()
    }
    
    func handleSignup() {
        vm.signup()
    }
    
    var body: some View {
        if !vm.loggedIn {
            VStack {
                Text("Connect your engram account to sync across all devices").multilineTextAlignment(.center).padding(.bottom)
                TextField("Email", text: $vm.email)
                    .textContentType(.emailAddress)
                    .autocapitalization(.none)
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
                HStack {
                    Link("Terms", destination: URL(string: "https://engram.xyzdigital.com/legal/terms-of-service")!)
                    Text("&")
                    Link("Privacy", destination: URL(string: "https://engram.xyzdigital.com/legal/privacy-policy")!)
                }.padding()
                
            }.frame(width: 256).navigationTitle("Sync Settings")
        } else {
            List {
                HStack {
                    Image(systemName: "person")
                    Text("Account")
                    Spacer()
                    Text(vm.email).foregroundColor(.gray)
                }
            }.navigationTitle("Sync Settings")
        }
    }
}

struct LoginScreen_Previews: PreviewProvider {
    static var previews: some View {
        LoginScreen()
    }
}
