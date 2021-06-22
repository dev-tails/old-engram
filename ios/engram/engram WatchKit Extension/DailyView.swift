//
//  DailyView.swift
//  engram WatchKit Extension
//
//  Created by Adam Berg on 2021-06-21.
//

import SwiftUI

struct DailyView: View {
    @ObservedObject var vm = sharedDailyViewModel
    
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
                    vm.addNote(note: newNote)
                }
            }
    }
    
    private func deleteItems(offsets: IndexSet) {
        var removedCount = 0;
        for i in offsets {
            let indexToRemove = i - removedCount
            vm.deleteNote(index: indexToRemove, id: vm.notes[indexToRemove]._id!)
            removedCount += 1
        }
    }
    
    var body: some View {
        VStack {
            List {
                ForEach(vm.notes) {note in
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
    }
}

struct DailyView_Previews: PreviewProvider {
    static var previews: some View {
        DailyView()
    }
}
