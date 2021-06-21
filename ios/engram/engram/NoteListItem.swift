import SwiftUI

struct NoteListItem: View {
    @ObservedObject var vm = sharedDailyViewModel
    private var _note: Note
    @State var start: Date = Date()
    
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

        let noteToSave = Note(_id: _note._id, type: type)
        
        vm.updateNote(note: noteToSave)
    }
    
    var body: some View {
        return HStack {
            if (_note.type == "task" || _note.type == "task_completed") {
                Button(action: toggleType) {
                    Image(systemName: _note.type == "task_completed" ? "checkmark.square" : "square")
                }
            }
//            if (_note.type == "event") {
//                DatePicker("", selection: $start, displayedComponents: .hourAndMinute)
//                    .labelsHidden()
//            }
            Text(_note.body!)
        }.opacity(_note.type == "task_completed" ? 0.25 : 1.0)
    }
}
