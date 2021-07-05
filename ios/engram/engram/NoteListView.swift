//
//  LogView.swift
//  engram
//
//  Created by Adam Berg on 2021-05-21.
//

import SwiftUI
import CloudKit

struct NoteListView: View {
    @ObservedObject var vm = sharedCKDailyViewModel
    @ObservedObject var vm2 = sharedCDDailyViewModel
    @State private var inputActive = true
    @State private var noteBody = ""
    var type: String
    
    let placeHolderByType = [
        "all": "What's on your mind?",
        "note": "What's on your mind?",
        "task": "What needs to get done today?",
        "event": "What's happening today?"
    ]
    
    init(type: String) {
        self.type = type
        
        var types = [type]
        if (type == "task") {
            types.append("task_completed")
        }
    }
    
    var body: some View {
        VStack {
            List {
                ForEach(Array(vm2.notes.enumerated()), id: \.offset) { index, note in
                    if type == "all" || note.type == type || (type == "task" && note.type == "task_completed") {
                        NoteListItem(note: note)
                            .contextMenu {
                                Button(action: {
                                    deleteItems(offsets: IndexSet([index]))
                                }){
                                    Text("Delete")
                                }
                            }
                    }
                }.onDelete(perform: deleteItems)
            }
            HStack {
                TextField(placeHolderByType[type]!, text: $noteBody, onCommit: addNote)
//                ScrollView(.horizontal, showsIndicators: false) {
                    
//                    CustomTextField(placeholder: placeHolderByType[type]!, text: $noteBody, onCommit: addNote).frame(height: 16)
//                }
                    
                Button(action: addNote) {
                    Image(systemName: "arrow.up.circle.fill")
                        .renderingMode(.template)
                        .foregroundColor(.white)
                        .imageScale(.large)
                }.keyboardShortcut(.return, modifiers: .control)
            }.padding(.horizontal, 16).padding(.vertical, 8).background(
                RoundedRectangle(cornerRadius: 8)
                    .fill(Color(UIColor.separator))
            ).padding(16)
        }
    }
    
    private func addNote() {
        if (noteBody == "") {
            return
        }
        
        withAnimation {
            let dateFormatter = DateFormatter()
            dateFormatter.dateFormat = "yyyy-MM-dd"
            
            let typeToSave = type == "all" ? "note" : type
            let newNote = Note(body: noteBody, date: dateFormatter.string(from: vm2.date), type: typeToSave, recordId: CKRecord.ID())

            noteBody = ""

            vm2.addNote(note: newNote)
        }
    }
    
    private func deleteItems(offsets: IndexSet) {
        var removedCount = 0;
        for i in offsets {
            let indexToRemove = i - removedCount
            vm2.deleteNote(id: vm2.notes[indexToRemove].id)
            removedCount += 1
        }
    }
}

struct NoteListView_Previews: PreviewProvider {
    static var previews: some View {
        NoteListView(type: "note")
    }
}
