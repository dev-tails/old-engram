//
//  ContentView.swift
//  engram WatchKit Extension
//
//  Created by Adam Berg on 2021-05-21.
//

import SwiftUI

struct ContentView: View {
    @Environment(\.managedObjectContext) private var viewContext
    
    private var notesRequest: FetchRequest<Note>
    var notes : FetchedResults<Note>{notesRequest.wrappedValue}
    
    init() {
        self.notesRequest = FetchRequest(entity: Note.entity(), sortDescriptors:[NSSortDescriptor(keyPath: \Note.createdAt, ascending: false)])
    }
    
    func handleDictateButtonPressed(type: String) -> Void {
        WKExtension.shared()
            .visibleInterfaceController?
            .presentTextInputController(withSuggestions: nil,
                                        allowedInputMode: .plain) { result in
                guard let result = result as? [String] else { return }
                
                
                withAnimation {
                    let newNote = Note(context: viewContext)
                    newNote.createdAt = Date()
                    newNote.body = result[0]
                    newNote.type = type
                    
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
    
    var body: some View {
        VStack {
            List {
                ForEach(notes) {note in
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

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
