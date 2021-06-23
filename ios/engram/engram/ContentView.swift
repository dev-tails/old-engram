//
//  ContentView.swift
//  engram
//
//  Created by Adam Berg on 2021-05-21.
//

import SwiftUI

struct ContentView: View {
    @ObservedObject var dailyVM = sharedDailyViewModel
    @ObservedObject var vm = sharedLoginViewModel
    @State private var tab = 0
    
    var body: some View {
        NavigationView {
            if sharedLoginViewModel.loggedIn {
                TabView(selection: $tab) {
                    DailyScreen(type: "all")
                        .tabItem {
                            Button(action: {
//                                tab = 0
                                dailyVM.setTypeFilter(type: "all")
                            }) {
                                Image(systemName: "list.dash")
                                Text("All")
                            }
                        }.tag(0)
                    DailyScreen(type: "note")
                        .tabItem {
                            Button(action: {
//                                tab = 1
                                dailyVM.setTypeFilter(type: "note")
                            }) {
                                Image(systemName: "minus")
                                Text("Notes")
                            }.keyboardShortcut("n", modifiers: .control)
                        }.tag(1)
                    DailyScreen(type: "task")
                        .tabItem {
                            Button(action: {
//                                tab = 2
                                dailyVM.setTypeFilter(type: "task")
                            }) {
                                Image(systemName: "square")
                                Text("Tasks")
                            }.keyboardShortcut("t", modifiers: .control)
                            
                        }.tag(2)
                    DailyScreen(type: "event")
                        .tabItem {
                            Button(action: {
//                                tab = 3
                                dailyVM.setTypeFilter(type: "event")
                            }) {
                                Image(systemName: "circle")
                                Text("Events")
                            }.keyboardShortcut("e", modifiers: .control)
                        }.tag(3)
                }
                .navigationTitle("engram")
                .navigationBarTitleDisplayMode(.inline)
                .navigationViewStyle(StackNavigationViewStyle())
            } else {
                LoginScreen()
                    .navigationTitle("engram")
                    .navigationBarTitleDisplayMode(.inline)
                    .navigationViewStyle(StackNavigationViewStyle())
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
