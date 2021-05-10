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
    
    func handleDictateButtonPressed() -> Void {
        WKExtension.shared()
            .visibleInterfaceController?
            .presentTextInputController(withSuggestions: nil,
                                        allowedInputMode: .plain) { result in
                guard let result = result as? [String] else { return }
                self.notes.append(Note(body: result[0]))
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
                    handleDictateButtonPressed();
                }
                Button("•") {
                    handleDictateButtonPressed();
                }
                Button("◦") {
                    handleDictateButtonPressed();
                }
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
