//
//  LogView.swift
//  engram
//
//  Created by Adam Berg on 2021-05-21.
//

import SwiftUI

struct NoteListView: View {
    @Environment(\.managedObjectContext) private var viewContext
    
    @State private var inputActive = true
    @State private var noteBody = ""
    var type: String
    private var notesRequest: FetchRequest<Note>
    var notes : FetchedResults<Note>{notesRequest.wrappedValue}
    
    let placeHolderByType = [
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
        
        let predicate = NSPredicate(format: "type IN %@", types)
        
        self.notesRequest = FetchRequest(entity: Note.entity(), sortDescriptors:[NSSortDescriptor(keyPath: \Note.type, ascending: true), NSSortDescriptor(keyPath: \Note.createdAt, ascending: false)], predicate: predicate)
    }
    
    var body: some View {
        VStack {
            List {
                ForEach(notes) {note in
                    NoteListItem(note: note)
                        .contextMenu {
                            Button(action: {
                                let noteIndex = notes.firstIndex(of: note)
                                deleteItems(offsets: IndexSet([noteIndex!]))
                            }){
                                Text("Delete")
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
        
//        withAnimation {
            let newNote = Note(context: viewContext)
            newNote.createdAt = Date()
            newNote.body = noteBody
            newNote.type = type
            noteBody = ""
            
            do {
                try viewContext.save()
            } catch {
                // Replace this implementation with code to handle the error appropriately.
                // fatalError() causes the application to generate a crash log and terminate. You should not use this function in a shipping application, although it may be useful during development.
                let nsError = error as NSError
                fatalError("Unresolved error \(nsError), \(nsError.userInfo)")
            }
//        }
    }
    
    private func deleteItems(offsets: IndexSet) {
        withAnimation {
            offsets.map { notes[$0] }.forEach(viewContext.delete)
            
            do {
                try viewContext.save()
            } catch {
                // Replace this implementation with code to handle the error appropriately.
                // fatalError() causes the application to generate a crash log and terminate. You should not use this function in a shipping application, although it may be useful during development.
                let nsError = error as NSError
                fatalError("Unresolved error \(nsError), \(nsError.userInfo)")
            }
        }
    }
}

struct NoteListView_Previews: PreviewProvider {
    static var previews: some View {
        NoteListView(type: "note")
    }
}
