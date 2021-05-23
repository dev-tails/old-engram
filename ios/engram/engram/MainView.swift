//
//  MainView.swift
//  engram
//
//  Created by Adam Berg on 2021-05-22.
//

import SwiftUI

struct MainView: View {
    @State private var tab = 1
    
    var body: some View {
        TabView(selection: $tab) {
            NoteListView(type: "note")
                .tabItem {
                    Button(action: {tab = 0}) {
                        Image(systemName: "line.horizontal.3")
                        Text("Notes")
                    }.keyboardShortcut("n", modifiers: .control)
                }.tag(0)
            NoteListView(type: "task")
                .tabItem {
                    Button(action: {tab = 1}) {
                        Image(systemName: "square")
                        Text("Tasks")
                    }.keyboardShortcut("t", modifiers: .control)
                    
                }.tag(1)
            NoteListView(type: "event")
                .tabItem {
                    Button(action: {tab = 2}) {
                        Image(systemName: "circle")
                        Text("Events")
                    }.keyboardShortcut("e", modifiers: .control)
                }.tag(2)
        }
        .navigationTitle("engram")
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct MainView_Previews: PreviewProvider {
    static var previews: some View {
        MainView()
    }
}
