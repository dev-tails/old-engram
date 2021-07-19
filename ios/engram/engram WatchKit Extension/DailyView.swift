//
//  DailyView.swift
//  engram WatchKit Extension
//
//  Created by Adam Berg on 2021-06-21.
//

import SwiftUI
import CloudKit

struct DailyView: View {
    @ObservedObject var vm = sharedCDDailyViewModel
    
    func handleDictateButtonPressed(type: String) -> Void {
        WKExtension.shared()
            .visibleInterfaceController?
            .presentTextInputController(withSuggestions: nil,
                                        allowedInputMode: .plain) { result in
                guard let result = result as? [String] else { return }
                
                
                withAnimation {
                    let dateFormatter = DateFormatter()
                    dateFormatter.dateFormat = "yyyy-MM-dd"
                    let newNote = Note(body: result[0], date: dateFormatter.string(from: Date()), type: type, recordId: CKRecord.ID())
                    vm.addNote(note: newNote)
                }
            }
    }
    
    private func deleteItems(offsets: IndexSet) {
        var removedCount = 0;
        for i in offsets {
            let indexToRemove = i - removedCount
            vm.deleteNote(id: vm.notes[indexToRemove].id)
            removedCount += 1
        }
    }
    
    var body: some View {
        VStack {
            List {
                ForEach(vm.notes) {note in
                    HStack {
                        if (note.type == "task" || note.type == "task_completed") {
                            Button(action: {
                                let type = note.type == "task" ? "task_completed" : "task"

                                let noteToSave = Note(id: note.id, type: type)

                                vm.saveNote(note: noteToSave)
                            }) {
                                Image(systemName: note.type == "task_completed" ? "checkmark.square" : "square")
                            }.frame(width: 16)
                        }
                        Text(note.body ?? "")
                    }
                }.onDelete(perform: deleteItems)
            }.toolbar {
                ToolbarItemGroup {
                    NavigationLink(destination: SettingsScreen(), label: {
                        Image(systemName: "gear")
                    })
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
        }.navigationTitle("engram")
    }
}

struct DailyView_Previews: PreviewProvider {
    static var previews: some View {
        DailyView()
    }
}
