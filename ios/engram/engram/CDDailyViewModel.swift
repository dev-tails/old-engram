//
//  CDDailyViewModel.swift
//  engram
//
//  Created by Adam Berg on 2021-07-02.
//

import Foundation
import SwiftUI
import CoreData

let sharedCDDailyViewModel = CDDailyViewModel()

class CDDailyViewModel: ObservableObject {
    @Published var notes: [Note] = []
    @Published var typeFilter: String = "all"
    @Published var date: Date = Date()
    
    init() {
        fetchNotesForDate(date: date)
    }
    
    func setDate(date: Date) {
        self.date = date
        self.fetchNotesForDate(date: date)
    }
    
    func fetchNotesForDate(date: Date) {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd";
        let dateString = dateFormatter.string(from: date)
         
        let request: NSFetchRequest<CDNote> = CDNote.fetchRequest()
        request.predicate = NSPredicate(format: "date == %@", dateString)
    
        persistentContainer.viewContext.perform {
            do {
                let newCDNotes = try request.execute()
                var newNotes: [Note] = []
                for n in newCDNotes {
                    newNotes.append(self.CDNoteToNote(cdNote: n))
                }
                self.notes = newNotes
            } catch {
                print("Unable to Execute Fetch Request, \(error)")
            }
        }
   }
    
    func addNote(note: Note) {
        let cdNote = CDNote(context: persistentContainer.viewContext)
        cdNote.body = note.body
        cdNote.type = note.type
        cdNote.start = note.start
        cdNote.date = note.date
        
        notes.insert(note, at: 0)
        saveContext()
    }
    
    func CDNoteToNote(cdNote: CDNote) -> Note {
        return Note(body: cdNote.body, date: cdNote.date, type: cdNote.type, start: cdNote.start)
    }
}
    
