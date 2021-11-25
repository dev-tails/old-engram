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
        vm.login(completion: { error in
            return
        })
    }
    
    func handleSignup() {
        vm.signup()
    }
    
    var body: some View {
        if !vm.loggedIn {
            VStack {
                #if os(watchOS)
                TextField("Email", text: $vm.email)
                    .textContentType(.emailAddress)
                #else
                Text("Connect your engram account to sync across all devices").multilineTextAlignment(.center).padding(.bottom)
                TextField("Email", text: $vm.email)
                    .textContentType(.emailAddress)
                    .autocapitalization(.none)
                #endif
                SecureField("Password", text: $vm.password)
                    .textContentType(.password)
                HStack {
                    #if !os(watchOS)
                    Button("Sign Up", action: handleSignup)
                        .alert(isPresented: $vm.hasSignupError) {
                            Alert(
                                title: Text("Error"),
                                message: Text(vm.signupError)
                            )
                        }
                    Spacer()
                    #endif
                    Button("Login", action: handleLogin)
                        .alert(isPresented: $vm.hasLoginError) {
                            Alert(
                                title: Text("Error"),
                                message: Text(vm.loginError)
                            )
                        }
                }
                #if !os(watchOS)
                HStack {
                    Link("Terms", destination: URL(string: "https://engram.xyzdigital.com/legal/terms-of-service")!)
                    Text("&")
                    Link("Privacy", destination: URL(string: "https://engram.xyzdigital.com/legal/privacy-policy")!)
                }.padding()
                #endif
                
            }
            .navigationTitle("Sync Settings")
            .padding()
        } else {
            List {
                HStack {
                    Image(systemName: "person")
                    Text("Account")
                    Spacer()
                    Text(vm.email).foregroundColor(.gray)
                }
                Button(action: {vm.logout()}, label: {Text("Logout")}).foregroundColor(Color.red)
            }.navigationTitle("Sync Settings")
        }
        Text("Sync is still early in development, it currently only supports sending new notes from your device to your engram account. This data is stored unencrypted in engram's database. If this is not ok with you, continue to use engram offline and more secure syncing options will be available in the future.").padding()
    }
}

struct LoginScreen_Previews: PreviewProvider {
    static var previews: some View {
        LoginScreen()
    }
}
