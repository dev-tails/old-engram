//
//  ContentView.swift
//  engram WatchKit Extension
//
//  Created by Adam Berg on 2021-05-21.
//

import SwiftUI

struct ContentView: View {
    @State private var notes : [Note] = []
    
    init() {
    }
    
    func handleDictateButtonPressed(type: String) -> Void {
        WKExtension.shared()
            .visibleInterfaceController?
            .presentTextInputController(withSuggestions: nil,
                                        allowedInputMode: .plain) { result in
                guard let result = result as? [String] else { return }
                
                
                withAnimation {
                    let dateFormatter = DateFormatter()
                    let newNote = Note(body: result[0], date: dateFormatter.string(from: Date()), type: type)
                    notes.append(newNote)
                }
            }
    }
    
    var body: some View {
        VStack {
            List {
//                ForEach(notes) {note in
//                    Text(note.body!)
//                }.onDelete(perform: deleteItems)
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
    
    private func deleteItems(offsets: IndexSet) {
        withAnimation {
            
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
