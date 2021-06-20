import SwiftUI

struct NoteListItem: View {
    private var _note: Note
    
    init(note: Note) {
        self._note = note
    }
    
    let typeToIconMap = [
        "note": "minus.circle",
        "task": "circle",
        "task_completed": "smallcircle.fill.circle",
    ]
    
    func toggleType() {
        let type = _note.type == "task" ? "task_completed" : "task"
        
        withAnimation {
//            _note.type = type
        }
    }
    
    var body: some View {
        return HStack {
            if (_note.type == "task" || _note.type == "task_completed") {
                Button(action: toggleType) {
                    Image(systemName: _note.type == "task_completed" ? "checkmark.square" : "square")
                }
            }
            Text(_note.body!)
        }.opacity(_note.type == "task_completed" ? 0.25 : 1.0)
    }
}
