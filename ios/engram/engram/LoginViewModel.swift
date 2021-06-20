//
//  LoginViewModel.swift
//  engram
//
//  Created by Adam Berg on 2021-06-20.
//

import Foundation

let sharedLoginViewModel = LoginViewModel()

class LoginViewModel: ObservableObject {
    @Published var loggedIn = false
    
    init() {
        fetchMe()
    }
    
    func fetchMe() {
        let url = URL(string: "https://engram.xyzdigital.com/api/users/me")!
        var request = URLRequest(url: url)
        request.setValue("application/json; charset=utf-8", forHTTPHeaderField: "Content-Type")
        request.setValue("application/json; charset=utf-8", forHTTPHeaderField: "Accept")
        let session = URLSession.shared
        let task = session.dataTask(with: request) { (data, response, error) in

            if let error = error {
                print(error)
            } else if let data = data {
                DispatchQueue.main.async {
                    if let httpResponse = response as? HTTPURLResponse {
                        if httpResponse.statusCode == 200 {
                            self.loggedIn = true
                        } else {
                            self.loggedIn = false
                        }
                    }
                }
                
            } else {
                // Handle unexpected error
            }
        }
        task.resume()
    }
    
    func login(email: String, password: String) {
        let url = URL(string: "https://engram.xyzdigital.com/api/users/login")!
        var request = URLRequest(url: url)
        request.setValue("application/json; charset=utf-8", forHTTPHeaderField: "Content-Type")
        request.setValue("application/json; charset=utf-8", forHTTPHeaderField: "Accept")
        
        let bodyData = try? JSONSerialization.data(
            withJSONObject: ["username": email, "password": password],
            options: []
        )

        request.httpMethod = "POST"
        request.httpBody = bodyData
        
        let session = URLSession.shared
        let task = session.dataTask(with: request) { (data, response, error) in

            if let error = error {
                print(error)
            } else if let data = data {
                DispatchQueue.main.async {
                    if let httpResponse = response as? HTTPURLResponse {
                        if httpResponse.statusCode == 200 {
                            self.loggedIn = true
                        } else {
                            self.loggedIn = false
                        }
                    }
                }
            } else {
                // Handle unexpected error
            }
        }
        task.resume()
    }
}
