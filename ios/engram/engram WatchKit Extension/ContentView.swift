//
//  ContentView.swift
//  engram WatchKit Extension
//
//  Created by Adam Berg on 2021-05-21.
//

import SwiftUI

struct ContentView: View {
    @ObservedObject var vm = sharedLoginViewModel
    @ObservedObject var dailyVM = sharedDailyViewModel
    
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
                    dateFormatter.dateFormat = "yyyy-MM-dd"
                    let newNote = Note(body: result[0], date: dateFormatter.string(from: Date()), type: type)
                    dailyVM.addNote(note: newNote)
                }
            }
    }
    
    var body: some View {
        if sharedLoginViewModel.loggedIn {
            VStack {
                List {
                    ForEach(dailyVM.notes) {note in
                        Text(note.body!)
                    }.onDelete(perform: deleteItems)
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
        } else {
            LoginView()
        }
    }
    
    private func deleteItems(offsets: IndexSet) {
        
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
