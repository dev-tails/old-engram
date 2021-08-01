//
//  LogView.swift
//  engram
//
//  Created by Adam Berg on 2021-05-21.
//

import SwiftUI
import CloudKit

struct NoteListView: View {
    @ObservedObject var vm2 = sharedCDDailyViewModel

    @State var noteBody = ""
    var type: String
    @State var noteToEditID: UUID?
    
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
                ForEach(Array(vm2.notes), id: \.id) { note in
                    if type == "all" || note.type == type || (type == "task" && note.type == "task_completed") {
                        NoteListItem(note: note)
                            .contextMenu {
                                Button(action: {
                                    handleEditNotePressed(note: note)
                                }){
                                    Text("Edit")
                                }
                                Button(action: {
                                    handleSharePressed(note: note)
                                }){
                                    Text("Share")
                                }
                                Button(action: {
                                    deleteNote(note: note)
                                }){
                                    Text("Delete")
                                }
                            }
                    }
                }.onDelete(perform: deleteItems)
            }
            HStack {
                TextField(placeHolderByType[type]!, text: $noteBody, onCommit: addNote)
                    
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
    
    private func handleSharePressed(note: Note) {
        let textToShare = [ note.body ]
        let activityViewController = UIActivityViewController(activityItems: textToShare, applicationActivities: nil)
        UIApplication.shared.windows.first?.rootViewController?.present(activityViewController, animated: true, completion: nil)
    }
    
    private func setNoteForEdit(note: Note) {
        noteToEditID = note.id
        noteBody = note.body ?? ""
    }
    
    private func handleEditNotePressed(note: Note) {
        setNoteForEdit(note: note)
    }
    
    private func addNote() {
        if (noteBody == "") {
            return
        }
        
        withAnimation {
            let dateFormatter = DateFormatter()
            dateFormatter.dateFormat = "yyyy-MM-dd"
            
            if noteToEditID != nil {
                let typeToSave = type == "all" ? nil : type
                let updatedNote = Note(id: noteToEditID, body: noteBody, date: dateFormatter.string(from: vm2.date), type: typeToSave)
                vm2.saveNote(note: updatedNote)
            } else {
                let typeToSave = type == "all" ? "note" : type
                let newNote = Note(body: noteBody, date: dateFormatter.string(from: vm2.date), type: typeToSave, recordId: CKRecord.ID())
                vm2.addNote(note: newNote)
            }
            noteBody = ""
            noteToEditID = nil
        }
    }
    
    private func deleteNote(note: Note) {
        vm2.deleteNote(id: note.id)
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
