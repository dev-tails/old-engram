import SwiftUI

struct NoteListItem: View {
    @Environment(\.managedObjectContext) private var viewContext
    @State private var completed: Bool
    
    var note: Note
    
    init(note: Note) {
        self.note = note
        completed = note.type == "task_completed"
    }
    
    let typeToIconMap = [
        "note": "minus.circle",
        "task": "circle",
        "task_completed": "smallcircle.fill.circle",
    ]
    
    func toggleType() {
        let type = note.type == "task" ? "task_completed" : "task"
        
        withAnimation {
            note.type = type
            
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
    
    var body: some View {
        return HStack {
            if (note.type == "task" || note.type == "task_completed") {
                Button(action: toggleType) {
                    Image(systemName: note.type == "task_completed" ? "checkmark.square" : "square")
                }
            }
            Text(note.body!)
        }.opacity(note.type == "task_completed" ? 0.25 : 1.0)
    }
}
