//
//  DailyViewModel.swift
//  engram
//
//  Created by Adam Berg on 2021-06-20.
//

import Foundation

let sharedDailyViewModel = DailyViewModel()

struct DecodableNote: Decodable, Encodable {
    var _id: String?
    var body: String?
    var date: String?
    var type: String?
    var start: String?
}

func sortNotesByStart(note1: Note, note2: Note) -> Bool {
    if note1.start == nil {
        return true
    }
    if note2.start == nil {
        return false
    }
    
    return note1.start! < note2.start!
}

class DailyViewModel: ObservableObject {
    @Published var allNotes: [Note] = []
    @Published var notes: [Note] = []
    @Published var typeFilter: String = "event"
    @Published var date: Date = Date()
    
    init() {
        fetchNotesForDate(date: date)
    }
    
    func setTypeFilter(type: String) {
        typeFilter = type
        updateNotesForType()
    }
    
    func updateNotesForType() {
        if typeFilter == "all" {
            self.notes = allNotes
            return
        }

        
        var notesForType: [Note] = []
        for note in allNotes {
            if (note.type == typeFilter) {
                notesForType.append(note)
            }
        }
        
        notesForType.sort(by: sortNotesByStart)
        
        self.notes = notesForType
        
        print(self.notes)
    }
    
    func setDate(date: Date) {
        self.date = date
        self.fetchNotesForDate(date: date)
    }
    
    func fetchNotesForDate(date: Date) {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd";
        let dateString = dateFormatter.string(from: date)
        
        let url = URL(string: String(format: "https://engram.xyzdigital.com/api/notes?date=%@", dateString))!
        var request = URLRequest(url: url)
        request.setValue("application/json; charset=utf-8", forHTTPHeaderField: "Content-Type")
        request.setValue("application/json; charset=utf-8", forHTTPHeaderField: "Accept")
        let session = URLSession.shared
        let task = session.dataTask(with: request) { (data, response, error) in

            if let error = error {
                print(error)
            } else if let data = data {
                let decoder = JSONDecoder()
                let decodedNotes = try? decoder.decode([DecodableNote].self, from: data)
                
                if let decodedNotesNeverNil = decodedNotes {
                    var newNotes: [Note] = []
                    for note in decodedNotesNeverNil {
                        newNotes.append(Note(_id: note._id, body: note.body, type: note.type, start: note.start))
                    }
                    
                    DispatchQueue.main.async {
                        self.allNotes = newNotes.reversed()
                        self.updateNotesForType()
                    }
                }
                
            } else {
                // Handle unexpected error
            }
        }
        task.resume()
    }
    
    func addNote(note: Note) {
        let url = URL(string: "https://engram.xyzdigital.com/api/notes")!
        var request = URLRequest(url: url)
        request.setValue("application/json; charset=utf-8", forHTTPHeaderField: "Content-Type")
        request.setValue("application/json; charset=utf-8", forHTTPHeaderField: "Accept")
        
        let bodyData = try? JSONSerialization.data(
            withJSONObject: ["body": note.body, "date": note.date, "type": note.type],
            options: []
        )

        request.httpMethod = "POST"
        request.httpBody = bodyData
        
        let session = URLSession.shared
        let task = session.dataTask(with: request) { (data, response, error) in

            if let error = error {
                print(error)
            } else if data != nil {
                let decoder = JSONDecoder()
                let decodedNote = try? decoder.decode(DecodableNote.self, from: data!)
                
                if let note = decodedNote {
                    let newNote = Note(_id: note._id, body: note.body, type: note.type, start: note.start)
                    
                    DispatchQueue.main.async {
                        self.allNotes.insert(newNote, at: 0)
                        self.updateNotesForType()
                    }
                }
            } else {
                // Handle unexpected error
            }
        }
        task.resume()
    }
    
    func updateNote(note: Note) {
        let noteIndex = allNotes.firstIndex(where: { $0._id == note._id})
        
        let url = URL(string: String(format: "https://engram.xyzdigital.com/api/notes/%@", note._id!))!
        var request = URLRequest(url: url)
        request.setValue("application/json; charset=utf-8", forHTTPHeaderField: "Content-Type")
        request.setValue("application/json; charset=utf-8", forHTTPHeaderField: "Accept")
        
        let jsonObject: NSMutableDictionary = NSMutableDictionary()

        if note.type != nil {
            jsonObject.setValue(note.type, forKey: "type")
            allNotes[noteIndex!].type = note.type
        }
        
        if (note.start != nil) {
            jsonObject.setValue(note.start, forKey: "start")
            allNotes[noteIndex!].start = note.start
        }
        
        updateNotesForType()
        
        let bodyData = try? JSONSerialization.data(
            withJSONObject: jsonObject,
            options: []
        )

        request.httpMethod = "PUT"
        request.httpBody = bodyData
        
        let session = URLSession.shared
        let task = session.dataTask(with: request) { (data, response, error) in

            if let error = error {
                print(error)
            } else if data != nil {
                
            } else {
                // Handle unexpected error
            }
        }
        task.resume()
    }
    
    func deleteNote(id: String) {
        allNotes.removeAll(where: {
            $0._id == id
        })
        
        updateNotesForType()
        
        let url = URL(string: String(format: "https://engram.xyzdigital.com/api/notes/%@", id))!
        var request = URLRequest(url: url)
        request.setValue("application/json; charset=utf-8", forHTTPHeaderField: "Content-Type")
        request.setValue("application/json; charset=utf-8", forHTTPHeaderField: "Accept")
        
        request.httpMethod = "DELETE"
        
        let session = URLSession.shared
        let task = session.dataTask(with: request) { (data, response, error) in

            if let error = error {
                print(error)
            } else if data != nil {
                
            } else {
                // Handle unexpected error
            }
        }
        task.resume()
    }
}
