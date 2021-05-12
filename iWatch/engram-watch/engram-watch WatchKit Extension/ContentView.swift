//
//  ContentView.swift
//  engram-watch WatchKit Extension
//
//  Created by Adam Berg on 2021-04-16.
//

import SwiftUI

struct Note: Identifiable {
    var id = UUID()
    var body: String
}

struct ContentView: View {
    @State var capturedText = ""
    @State var notes: [Note] = []
    let manager: HttpAuth
    
    func handleDictateButtonPressed(type: String) -> Void {
        WKExtension.shared()
            .visibleInterfaceController?
            .presentTextInputController(withSuggestions: nil,
                                        allowedInputMode: .plain) { result in
                guard let result = result as? [String] else { return }
                
                let body = result[0]
                
                if (manager.authenticated) {
                    manager.createNote(body: body, type: type)
                }
                
                self.notes.append(Note(body: body))
            }
    }
    
    var body: some View {
        Text(capturedText)
        VStack {
            List {
                ForEach(notes.reversed(), id: \.id) { note in
                    Text(note.body)
                }
            }
            HStack {
                Button("-") {
                    handleDictateButtonPressed(type: "note");
                }
                Button("•") {
                    handleDictateButtonPressed(type: "task");
                }
                Button("◦") {
                    handleDictateButtonPressed(type: "event");
                }
            }
        }
    }
}
